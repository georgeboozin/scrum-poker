import type { Hand } from "@/shared/domain/hand";
import type { AddHand, UpdateHand } from "@/shared/kernel/teammate-events";
import { TeammateEvent } from "@/shared/kernel/teammate-events";

export function createAddHand(hand: Pick<Hand, "name">): AddHand {
  return {
    event: TeammateEvent.AddHand,
    payload: {
      hand,
    },
  };
}

export function createUpdateHand(hand: Omit<Hand, "id">): UpdateHand {
  return {
    event: TeammateEvent.UpdateHand,
    payload: {
      hand,
    },
  };
}
