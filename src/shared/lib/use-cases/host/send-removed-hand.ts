import { useCallback } from "react";
import { createRemoveHand } from "@/shared/lib/services/host/event-creator";
import type { PeerManagerService } from "@/shared/lib/use-cases/ports";
import { PeerManager } from "@/shared/lib/services/PeerManager";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useSendRemovedHand() {
  const sendRemovedHand = useCallback((connectionId: string) => {
    const event = createRemoveHand(connectionId);
    peerManager.broadcast(event, [connectionId]);
  }, []);

  return { sendRemovedHand };
}
