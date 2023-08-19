import { useEffect } from "react";
import { peerManager } from "@/shared/lib/services/PeerManager";

export function useCloseConnections() {
  useEffect(() => {
    peerManager.closeConnections();
  }, []);
}
