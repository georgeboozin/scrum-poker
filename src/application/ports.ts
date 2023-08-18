import { Hand } from "@/domain/hand";

export interface HandsService {
  hands: Hand[];
  addHand: (hand: Hand) => void;
  removeHand: (handId: string) => void;
  resetHands: () => void;
  updateHands: (hands: Hand[]) => void;
  changeHandValue: (handId: string, value: string | null) => void;
}
