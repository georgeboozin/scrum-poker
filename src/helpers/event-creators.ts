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

interface SetHands {
  event: HostEvents.SetHands;
  payload: {
    hands: Hand[];
  };
}

export function createSetHands(hands: Hand[]): SetHands {
  return {
    event: HostEvents.SetHands,
    payload: {
      hands,
    },
  };
}

interface AddUser {
  event: HostEvents.AddUser;
  payload: {
    user: User;
  };
}

export function createAddUser(user: User): AddUser {
  return {
    event: HostEvents.AddUser,
    payload: {
      user,
    },
  };
}

interface ChangeHand {
  event: HostEvents.ChangeHand;
  payload: {
    hand: Hand;
  };
}

export function createChangeHand(hand: Hand): ChangeHand {
  return {
    event: HostEvents.ChangeHand,
    payload: {
      hand,
    },
  };
}

interface RemoveHand {
  event: HostEvents.RemoveHand;
  payload: {
    handId: string;
  };
}

export function createRemoveHand(handId: string): RemoveHand {
  return {
    event: HostEvents.RemoveHand,
    payload: {
      handId,
    },
  };
}

interface RevealCards {
  event: HostEvents.RevealCards;
}

export function createRevealCards(): RevealCards {
  return {
    event: HostEvents.RevealCards,
  };
}

interface ResetVoting {
  event: HostEvents.ResetVoting;
}

export function createResetVoting(): ResetVoting {
  return {
    event: HostEvents.ResetVoting,
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
