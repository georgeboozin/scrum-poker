import { useCallback } from "react";
import { createResetVoting } from "@/shared/lib/services/event-creators";
import { peerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useResetVoting() {
  const { changIsRevealed, resetHands }: HandsService = useHands();

  const handleResetVoting = useCallback(() => {
    const event = createResetVoting();
    peerManager.broadcast(event);
    resetHands();
    changIsRevealed(false);
  }, [resetHands, changIsRevealed]);

  return { resetVoting: handleResetVoting };
}
