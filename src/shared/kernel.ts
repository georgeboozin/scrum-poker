import { Hand } from "@/shared/domain/hand";
import { HostEvents, UserEvents } from "@/constants";

interface User {
  id: string;
  name: string;
}

export interface UpdateHands {
  event: HostEvents.UpdateHands;
  payload: {
    hands: Hand[];
  };
}

export interface AddUser {
  event: HostEvents.AddUser;
  payload: {
    user: User;
  };
}

export interface ChangeHand {
  event: HostEvents.ChangeHand;
  payload: {
    hand: Hand;
  };
}

export interface RemoveHand {
  event: HostEvents.RemoveHand;
  payload: {
    handId: string;
  };
}

export interface RevealCards {
  event: HostEvents.RevealCards;
}

export interface ResetVoting {
  event: HostEvents.ResetVoting;
}

export interface SetName {
  event: UserEvents.SetName;
  payload: {
    name: string;
  };
}

export interface SelectCard {
  event: UserEvents.SelectCard;
  payload: {
    name: string;
    value: string | null;
  };
}

export type EventPayload =
  | UpdateHands
  | AddUser
  | ChangeHand
  | RemoveHand
  | RevealCards
  | ResetVoting
  | ResetVoting
  | SetName
  | SelectCard;
