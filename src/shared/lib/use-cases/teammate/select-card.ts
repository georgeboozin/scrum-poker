import { useCallback } from "react";
import { changeHandValue } from "@/shared/domain/hand";
import { useStore } from "@/shared/lib/services/store";
import { createSelectCard } from "@/shared/lib/services/event-creators";
import { peerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useSelectCard() {
  const { user } = useStore();
  const { hands, updateHands }: HandsService = useHands();
  const [userHand] = hands;

  const handleSelectCard = useCallback(
    (value: string | null) => {
      const event = createSelectCard({ name: String(user.name), value });
      peerManager.send(event);
      updateHands((prev) => changeHandValue(prev, userHand.id, value));
    },
    [user]
  );

  return { handleSelectCard };
}
