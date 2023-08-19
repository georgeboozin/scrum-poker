import { useCallback } from "react";
import { resetHands } from "@/shared/domain/hand";
import { createResetVoting } from "@/shared/lib/services/host/event-creator";
import type {
  HandsService,
  PeerManagerService,
} from "@/shared/lib/use-cases/ports";
import { useHands } from "@/shared/lib/services/hands";
import { PeerManager } from "@/shared/lib/services/PeerManager";

const peerManager: PeerManagerService = PeerManager.getInstance();

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
