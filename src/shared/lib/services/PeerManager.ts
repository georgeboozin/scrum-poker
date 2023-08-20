import { DataConnection, Peer } from "peerjs";
import { PeerManagerService } from "@/shared/lib/use-cases/ports";

const PEER_JS_SERVER = {
  host: "0.peerjs.com",
  port: 443,
  path: "/",
  debug: 3, // 0 - disable logs, 1 - only errors, 2 - errors and warnings, 3 - all logs
};

export class PeerManager implements PeerManagerService {
  private static instance: PeerManager;
  private peer: Peer | null;
  private connections: {
    [key: string]: DataConnection;
  };

  constructor() {
    this.connections = {};
    this.peer = null;
  }

  static getInstance() {
    if (!PeerManager.instance) {
      PeerManager.instance = new PeerManager();
    }
    return PeerManager.instance;
  }

  public onOpen(callback: (id: string) => void) {
    const peer = new Peer(PEER_JS_SERVER);
    this.peer = peer;
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
      const [connection] = Object.values(this.connections);
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
