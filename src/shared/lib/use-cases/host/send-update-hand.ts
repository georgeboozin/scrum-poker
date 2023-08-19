import { useCallback } from "react";
import type { Hand } from "@/shared/domain/hand";
import type { PeerManagerService } from "@/shared/lib/use-cases/ports";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { createUpdateHand } from "@/shared/lib/services/host/event-creator";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useSendUpdateHand() {
  const handleSendUpdateHand = useCallback(
    (hand: Hand, connectionId: string) => {
      const event = createUpdateHand(hand);
      peerManager.broadcast(event, [connectionId]);
    },
    []
  );

  return { sendUpdateHand: handleSendUpdateHand };
}
