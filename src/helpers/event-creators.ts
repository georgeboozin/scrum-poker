import { HostEvents, UserEvents } from "@/constants";

export interface Hand {
  id: string;
  name: string;
  value?: string | null;
}

interface User {
  id: string;
  name: string;
}

export function createSetHands(hands: Hand[]) {
  return {
    event: HostEvents.SetHands as HostEvents.SetHands,
    payload: {
      hands,
    },
  };
}

export function createAddUser(user: User) {
  return {
    event: HostEvents.AddUser as HostEvents.AddUser,
    payload: {
      user,
    },
  };
}

export function createChangeHand(hand: Hand) {
  return {
    event: HostEvents.ChangeHand as HostEvents.ChangeHand,
    payload: {
      hand,
    },
  };
}

export function createRemoveHand(handId: string) {
  return {
    event: HostEvents.RemoveHand as HostEvents.RemoveHand,
    payload: {
      handId,
    },
  };
}

export function createRevealCards() {
  return {
    event: HostEvents.RevealCards as HostEvents.RevealCards,
    payload: {},
  };
}

export function createResetVoting() {
  return {
    event: HostEvents.ResetVoting as HostEvents.ResetVoting,
    payload: {},
  };
}

export function createSetName(name: string) {
  return {
    event: UserEvents.SetName as UserEvents.SetName,
    payload: {
      name,
    },
  };
}

interface SelectCard {
  name: string;
  value: string | null;
}

export function createSelectCard({ name, value }: SelectCard) {
  return {
    event: UserEvents.SelectCard as UserEvents.SelectCard,
    payload: {
      name,
      value,
    },
  };
}
