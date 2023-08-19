import * as HostEvents from "./host-events";
import * as TeammateEvents from "./teammate-events";

export type EventPayload =
  | HostEvents.UpdateHands
  | HostEvents.AddHand
  | HostEvents.UpdateHand
  | HostEvents.RemoveHand
  | HostEvents.RevealHands
  | HostEvents.ResetVoting
  | TeammateEvents.AddHand
  | TeammateEvents.UpdateHand;
