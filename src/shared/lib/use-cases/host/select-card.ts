import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/shared/lib/services/store";
import { createChangeHand } from "@/shared/lib/services/event-creators";
import { peerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useSelectCard() {
  const { roomId } = useParams();
  const { user } = useStore();
  const { changeHandValue }: HandsService = useHands();

  const handleSelectCard = useCallback(
    (value: string | null) => {
      const event = createChangeHand({
        id: String(roomId),
        name: String(user.name),
        value,
      });
      peerManager.broadcast(event);
      changeHandValue(user.id, value);
    },
    [changeHandValue, roomId, user]
  );

  return { handleSelectCard };
}
