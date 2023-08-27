import { useCallback, useRef } from "react";
import type { Hand } from "@/shared/domain/hand";
import { createUpdateHands } from "@/shared/lib/services/host/event-creator";
import type {
  HandsService,
  PeerManagerService,
} from "@/shared/lib/use-cases/ports";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { useHands } from "@/shared/lib/services/hands";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useSendHands() {
  const { hands }: HandsService = useHands();
  const mutableHands = useRef<Hand[]>([]);
  mutableHands.current = hands;

  const sendHands = useCallback((connectionId: string) => {
    const newHands = mutableHands.current;
    if (newHands.length !== 0) {
      const event = createUpdateHands(newHands);
      peerManager.send(event, connectionId);
    }
  }, []);

  return { sendHands };
}
