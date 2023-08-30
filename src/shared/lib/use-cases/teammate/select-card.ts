import { useCallback } from "react";
import { changeHandValue, getUserHand } from "@/shared/domain/hand";
import { createUpdateHand } from "@/shared/lib/services/teammate/event-creator";
import {
  HandsService,
  PeerManagerService,
  StoreService,
} from "@/shared/lib/use-cases/ports";
import { useStore } from "@/shared/lib/services/store";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useSelectCard() {
  const {
    user: { id, name },
  }: StoreService = useStore();
  const { updateHands }: HandsService = useHands();

  const selectCard = useCallback(
    (value: string | null) => {
      const event = createUpdateHand({ name, value });
      peerManager.send(event);
      updateHands((prev) => changeHandValue(prev, id, value));
    },
    [updateHands, name, id]
  );

  return { selectCard };
}

export function useSelectCard1() {
  const {
    user: { id },
  }: StoreService = useStore();
  const { updateHands }: HandsService = useHands();

  const selectCard = useCallback(
    (value: string | null) => {
      updateHands((prev) => changeHandValue(prev, id, value));
    },
    [updateHands, id]
  );

  return { selectCard };
}
