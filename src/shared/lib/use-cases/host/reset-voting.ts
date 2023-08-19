import { useCallback } from "react";
import { resetHands } from "@/shared/domain/hand";
import { createResetVoting } from "@/shared/lib/services/event-creators";
import { peerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useResetVoting() {
  const { changeIsRevealed, updateHands }: HandsService = useHands();

  const handleResetVoting = useCallback(() => {
    const event = createResetVoting();
    peerManager.broadcast(event);
    updateHands((prev) => resetHands(prev));
    changeIsRevealed(false);
  }, [updateHands, changeIsRevealed]);

  return { resetVoting: handleResetVoting };
}
