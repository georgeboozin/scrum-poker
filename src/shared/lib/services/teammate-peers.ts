import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "@/shared/lib/services/store";
import { HostEvents } from "@/constants";
import { createSetName } from "@/shared/lib/services/event-creators";
import { peerManager } from "@/shared/lib/services/PeerManager";
import { DataConnection } from "peerjs";
import type { EventPayload } from "@/shared/kernel";
import { useUpdateHands } from "@/shared/lib/use-cases/update-hands";
import { useAddHand } from "@/shared/lib/use-cases/add-hand";
import { useRemoveHand } from "@/shared/lib/use-cases/remove-hand";
import { useChangeHandValue } from "@/shared/lib/use-cases/change-hand-value";
import { useRevealHands } from "@/shared/lib/use-cases/teammate/reveal-hands";
import { useResetVoting } from "@/shared/lib/use-cases/teammate/reset-voting";

type Data = EventPayload;

export function useTeammatePeers() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { user } = useStore();
  const { updateHands } = useUpdateHands();
  const { addHand } = useAddHand();
  const { removeHand } = useRemoveHand();
  const { changeHandValue } = useChangeHandValue();
  const { revealHands } = useRevealHands();
  const { resetVoting } = useResetVoting();

  const handleConnectionOpen = useCallback((connection: DataConnection) => {
    const event = createSetName(String(user.name));
    peerManager.send(event, connection.peer);
  }, []);

  const handleConnectionClose = useCallback(() => {
    navigate("/");
  }, []);

  const handleConnectionData = useCallback((data: Data) => {
    if (data.event === HostEvents.UpdateHands) {
      updateHands(data.payload.hands);
    }

    if (data.event === HostEvents.AddUser) {
      addHand(data.payload.user);
    }

    if (data.event === HostEvents.ChangeHand) {
      changeHandValue(data.payload.hand.id, data.payload.hand.value ?? null);
    }

    if (data.event === HostEvents.RevealCards) {
      revealHands();
    }

    if (data.event === HostEvents.ResetVoting) {
      resetVoting();
    }
    if (data.event === HostEvents.RemoveHand) {
      removeHand(data.payload.handId);
    }
  }, []);

  const setup = useCallback(() => {
    if (roomId) {
      const connection = peerManager.connect(roomId);
      if (connection) {
        peerManager.onConnectionOpen(connection.peer, () =>
          handleConnectionOpen(connection)
        );
        peerManager.onConnectionClose(connection.peer, handleConnectionClose);
        peerManager.onConnectionData(connection.peer, handleConnectionData);
      }
    }
  }, [roomId]);

  return {
    setup,
  };
}
