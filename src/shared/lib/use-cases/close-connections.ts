import { useEffect } from "react";
import type { PeerManagerService } from "@/shared/lib/use-cases/ports";
import { PeerManager } from "@/shared/lib/services/PeerManager";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useCloseConnections() {
  useEffect(() => {
    peerManager.closeConnections();
  }, []);
}
