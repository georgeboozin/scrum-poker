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
  const { user }: StoreService = useStore();
  const { hands, updateHands }: HandsService = useHands();
  const userHand = getUserHand(hands, user.id);

  const handleSelectCard = useCallback(
    (value: string | null) => {
      const event = createUpdateHand({ name: String(user.name), value });
      peerManager.send(event);
      updateHands((prev) => changeHandValue(prev, String(userHand?.id), value));
    },
    [updateHands, user.name, userHand?.id]
  );

  return { handleSelectCard };
}
