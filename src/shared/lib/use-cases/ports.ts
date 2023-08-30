import type { DataConnection } from "peerjs";
import type { User } from "@/shared/domain/user";
import type { Hand } from "@/shared/domain/hand";

export interface StoreService {
  user: User;
  updateUser: (user: User) => void;
}

export interface HandsService {
  hands: Hand[];
  isRevealed: boolean;
  updateHands(hands: Hand[]): void;
  updateHands(callback: (prev: Hand[]) => Hand[]): void;
  changeIsRevealed(isRevealed: boolean): void;
}

export interface PeerManagerService {
  onOpen(callback: (id: string) => void): void;
  onError(callback: (error: Error) => void): void;
  onConnection(callback: (connection: DataConnection) => void): void;
  onConnectionOpen(peerId: string, callback: () => void): void;
  onConnectionData<T>(peerId: string, callback: (data: T) => void): void;
  onConnectionClose(peerId: string, callback: () => void): void;
  connect(id: string): void;
  closeConnections(): void;
  send<T>(event: T, connectionId?: string): void;
  broadcast<T>(event: T, exceptions?: string[]): void;
}
