import type { Hand } from "@/shared/domain/hand";
import { HostEvent } from "@/shared/kernel/host-events";
import type {
  UpdateHands,
  AddHand,
  UpdateHand,
  RemoveHand,
  RevealHands,
  ResetVoting,
} from "@/shared/kernel/host-events";

export function createUpdateHands(hands: Hand[]): UpdateHands {
  return {
    event: HostEvent.UpdateHands,
    payload: {
      hands,
    },
  };
}

export function createAddHand(hand: Hand): AddHand {
  return {
    event: HostEvent.AddHand,
    payload: {
      hand,
    },
  };
}

export function createUpdateHand(hand: Hand): UpdateHand {
  return {
    event: HostEvent.UpdateHand,
    payload: {
      hand,
    },
  };
}

export function createRemoveHand(handId: string): RemoveHand {
  return {
    event: HostEvent.RemoveHand,
    payload: {
      handId,
    },
  };
}

export function createRevealHands(): RevealHands {
  return {
    event: HostEvent.RevealHands,
  };
}

export function createResetVoting(): ResetVoting {
  return {
    event: HostEvent.ResetVoting,
  };
}
