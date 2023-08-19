import type { Hand } from "@/shared/domain/hand";

export enum HostEvent {
  UpdateHands = "host/UPDATE_HANDS",
  UpdateHand = "host/UPDATE_HAND",
  AddHand = "host/ADD_HAND",
  RemoveHand = "host/REMOVE_HAND",
  RevealHands = "host/REVEAL_HANDS",
  ResetVoting = "host/RESET_VOTING",
}

export interface UpdateHands {
  event: HostEvent.UpdateHands;
  payload: {
    hands: Hand[];
  };
}

export interface AddHand {
  event: HostEvent.AddHand;
  payload: {
    hand: Hand;
  };
}

export interface UpdateHand {
  event: HostEvent.UpdateHand;
  payload: {
    hand: Hand;
  };
}

export interface RemoveHand {
  event: HostEvent.RemoveHand;
  payload: {
    handId: string;
  };
}

export interface RevealHands {
  event: HostEvent.RevealHands;
}

export interface ResetVoting {
  event: HostEvent.ResetVoting;
}
