import { PeerManager } from "./PeerManager";

export class Postman {
  public connectionId?: string;
  public peerManager: PeerManager;

  constructor(connectionId?: string) {
    if (connectionId) {
      this.connectionId = connectionId;
    }
    this.peerManager = PeerManager.Instance;
  }

  public send<T>(event: T) {
    if (this.connectionId) {
      this.peerManager.connections[this.connectionId].send(event);
    }
  }

  public broadcast<T>(event: T) {
    Object.entries(this.peerManager.connections).forEach(
      ([connectionId, connecition]) => {
        if (this.connectionId !== connectionId) {
          connecition.send(event);
        }
      }
    );
  }
}
