import { useEffect } from "react";
import { peerManager } from "@/services/PeerManager";

export function useCloseConnections() {
  useEffect(() => {
    peerManager.closeConnections();
  }, []);
}
