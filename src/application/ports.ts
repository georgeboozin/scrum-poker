import { DataConnection, Peer } from "peerjs";
import { Hand } from "@/domain/hand";
import { User } from "@/domain/user";

export interface HandsService {
  hands: Hand[];
  isRevealed: boolean;
  addHand: (hand: Hand) => void;
  removeHand: (handId: string) => void;
  resetHands: () => void;
  updateHands: (hands: Hand[]) => void;
  changeHandValue: (handId: string, value: string | null) => void;
  changIsRevealed: (isRevealed: boolean) => void;
}

export interface StoreService {
  user: User;
  updateUser: (user: User) => void;
}

export interface PeerManagerService {
  setPeer(peer: Peer): void;
  onOpen(callback: (id: string) => void): void;
  onError(callback: (error: Error) => void): void;
  onConnection(callback: (connection: DataConnection) => void): void;
  onConnectionData<T>(peerId: string, callback: (data: T) => void): void;
  onConnectionOpen(peerId: string, callback: () => void): void;
  onConnectionClose(peerId: string, callback: () => void): void;
  closeConnections(): void;
  connect(id: string): void;
  send<T>(event: T, connectionId?: string): void;
  broadcast<T>(event: T, exceptions: string[]): void;
}
