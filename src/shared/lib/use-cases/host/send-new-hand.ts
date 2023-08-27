import { useCallback } from "react";
import type { Hand } from "@/shared/domain/hand";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import type { PeerManagerService } from "@/shared/lib/use-cases/ports";
import { createAddHand } from "@/shared/lib/services/host/event-creator";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useSendNewHand() {
  const sendNewHand = useCallback((hand: Hand, connectionId: string) => {
    const event = createAddHand(hand);
    peerManager.broadcast(event, [connectionId]);
  }, []);

  return { sendNewHand };
}
