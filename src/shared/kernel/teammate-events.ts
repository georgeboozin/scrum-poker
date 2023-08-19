import type { Hand } from "../domain/hand";

export enum TeammateEvent {
  AddHand = "teammate/ADD_HAND",
  UpdateHand = "teammate/UPDATE_HAND",
}

export interface AddHand {
  event: TeammateEvent.AddHand;
  payload: {
    hand: Pick<Hand, "name">;
  };
}

export interface UpdateHand {
  event: TeammateEvent.UpdateHand;
  payload: {
    hand: Omit<Hand, "id">;
  };
}
