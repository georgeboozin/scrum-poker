import { useCallback } from "react";
import { createRevealCards } from "@/shared/lib/services/event-creators";
import { peerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useRevealHands() {
  const { changeIsRevealed }: HandsService = useHands();

  const handleRevealHands = useCallback(() => {
    const event = createRevealCards();
    peerManager.broadcast(event);
    changeIsRevealed(true);
  }, []);

  return { revealHands: handleRevealHands };
}
