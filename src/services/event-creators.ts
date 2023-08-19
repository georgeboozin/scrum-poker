import { Hand } from "@/domain/hand";
import { HostEvents, UserEvents } from "@/constants";
import type {
  UpdateHands,
  AddUser,
  ChangeHand,
  RemoveHand,
  RevealCards,
  ResetVoting,
  SetName,
  SelectCard,
} from "@/shared/kernel";

interface User {
  id: string;
  name: string;
}

export function createUpdateHands(hands: Hand[]): UpdateHands {
  return {
    event: HostEvents.UpdateHands,
    payload: {
      hands,
    },
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

export function createChangeHand(hand: Hand): ChangeHand {
  return {
    event: HostEvents.ChangeHand,
    payload: {
      hand,
    },
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

export function createRevealCards(): RevealCards {
  return {
    event: HostEvents.RevealCards,
  };
}

export function createResetVoting(): ResetVoting {
  return {
    event: HostEvents.ResetVoting,
  };
}

export function createSetName(name: string): SetName {
  return {
    event: UserEvents.SetName,
    payload: {
      name,
    },
  };
}

export function createSelectCard({
  name,
  value,
}: {
  name: string;
  value: string | null;
}): SelectCard {
  return {
    event: UserEvents.SelectCard,
    payload: {
      name,
      value,
    },
  };
}
