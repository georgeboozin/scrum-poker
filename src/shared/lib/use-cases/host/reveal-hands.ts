import { useCallback } from "react";
import { createRevealHands } from "@/shared/lib/services/host/event-creator";
import type {
  HandsService,
  PeerManagerService,
} from "@/shared/lib/use-cases/ports";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useRevealHands() {
  const { changeIsRevealed }: HandsService = useHands();

  const revealHands = useCallback(() => {
    const event = createRevealHands();
    peerManager.broadcast(event);
    changeIsRevealed(true);
  }, [changeIsRevealed]);

  return { revealHands };
}
