import { DataConnection, Peer } from "peerjs";
import { PeerManagerService } from "@/shared/lib/use-cases/ports";

class PeerManager implements PeerManagerService {
  private peer: Peer | null;
  private connections: {
    [key: string]: DataConnection;
  };
  constructor() {
    this.connections = {};
    this.peer = null;
  }

  public setPeer(peer: Peer) {
    this.peer = peer;
  }

  public onOpen(callback: (id: string) => void) {
    this.peer?.on("open", callback);
  }

  public onError(callback: (error: Error) => void) {
    this.peer?.on("error", callback);
  }

  public onConnection(callback: (connection: DataConnection) => void) {
    this.peer?.on("connection", (connection) => {
      this.connections[connection.peer] = connection;
      callback(connection);
    });
  }

  public onConnectionData<T>(peerId: string, callback: (data: T) => void) {
    this.connections[peerId].on("data", callback as (data: unknown) => void);
  }

  public onConnectionOpen(peerId: string, callback: () => void) {
    this.connections[peerId].on("open", callback);
  }

  public onConnectionClose(peerId: string, callback: () => void) {
    this.connections[peerId].on("close", () => {
      callback();
      delete this.connections[peerId];
    });
  }

  public closeConnections() {
    Object.values(this.connections).forEach((connection) => {
      connection.close();
      delete this.connections[connection.peer];
    });
    this.peer?.disconnect();
    this.peer = null;
  }

  public connect(id: string) {
    const connection = this.peer?.connect(id);
    if (connection) {
      this.connections[connection.peer] = connection;
      return connection;
    }
  }

  public send<T>(event: T, connectionId?: string) {
    if (connectionId) {
      this.connections[connectionId].send(event);
      return;
    } else {
      const [connection] = Object.values(peerManager.connections);
      connection.send(event);
    }
  }

  public broadcast<T>(event: T, exceptions: string[] = []) {
    Object.entries(this.connections).forEach(([connectionId, connecition]) => {
      if (!exceptions.includes(connectionId)) {
        connecition.send(event);
      }
    });
  }
}

export const peerManager = new PeerManager();
