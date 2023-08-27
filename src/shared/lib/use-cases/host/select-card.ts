import { useCallback } from "react";
import { useParams } from "react-router-dom";
import { changeHandValue } from "@/shared/domain/hand";
import { createUpdateHand } from "@/shared/lib/services/host/event-creator";
import type {
  HandsService,
  PeerManagerService,
} from "@/shared/lib/use-cases/ports";
import { useStore } from "@/shared/lib/services/store";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useSelectCard() {
  const { roomId } = useParams();
  const { user } = useStore();
  const { updateHands }: HandsService = useHands();

  const selectCard = useCallback(
    (value: string | null) => {
      const event = createUpdateHand({
        id: String(roomId),
        name: String(user.name),
        value,
      });
      peerManager.broadcast(event);
      updateHands((prev) => changeHandValue(prev, user.id, value));
    },
    [updateHands, roomId, user]
  );

  return { selectCard };
}
