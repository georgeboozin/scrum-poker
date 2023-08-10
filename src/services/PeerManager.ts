import { Peer } from "peerjs";
import { DataConnection } from "peerjs";
import { PEER_JS_SERVER } from "@/constants";

export class PeerManager {
  private static _instance: PeerManager;
  public peer: Peer;
  public connections: {
    [key: string]: DataConnection;
  };

  constructor() {
    this.peer = new Peer(PEER_JS_SERVER);
    this.connections = {};
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  public onOpen(handler: (id: string) => void) {
    this.peer.on("open", handler);
  }

  public onError(handler: (error: Error) => void) {
    this.peer.on("error", handler);
  }

  public onConnection(handler: (connection: DataConnection) => void) {
    this.peer.on("connection", (connection) => {
      this.connections[connection.peer] = connection;
      handler(connection);
    });
  }

  public onData<T>(peerId: string, handler: (data: T) => void) {
    this.connections[peerId].on("data", handler as (data: unknown) => void);
  }

  public onOpenConnection(peerId: string, handler: () => void) {
    this.connections[peerId].on("open", handler);
  }

  public onCloseConnection(peerId: string, handler: () => void) {
    this.connections[peerId].on("close", () => {
      handler();
      delete this.connections[peerId];
    });
  }

  public connect(id: string) {
    const connection = this.peer.connect(id);
    this.connections[connection.peer] = connection;
    return connection;
  }
}
