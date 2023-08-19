import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "@/shared/lib/services/store";
import { HostEvent } from "@/shared/kernel/host-events";
import { createAddHand } from "@/shared/lib/services/teammate/event-creator";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { DataConnection } from "peerjs";
import type { EventPayload } from "@/shared/kernel";
import { useUpdateHands } from "@/shared/lib/use-cases/update-hands";
import { useAddHand } from "@/shared/lib/use-cases/add-hand";
import { useRemoveHand } from "@/shared/lib/use-cases/remove-hand";
import { useChangeHandValue } from "@/shared/lib/use-cases/change-hand-value";
import { useRevealHands } from "@/shared/lib/use-cases/teammate/reveal-hands";
import { useResetVoting } from "@/shared/lib/use-cases/teammate/reset-voting";

const peerManager = PeerManager.getInstance();

export function usePeer() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { user } = useStore();
  const { updateHands } = useUpdateHands();
  const { addHand } = useAddHand();
  const { removeHand } = useRemoveHand();
  const { changeHandValue } = useChangeHandValue();
  const { revealHands } = useRevealHands();
  const { resetVoting } = useResetVoting();

  const handleConnectionOpen = useCallback(
    (connection: DataConnection) => {
      const event = createAddHand({
        name: String(user.name),
      });
      peerManager.send(event, connection.peer);
    },
    [user.name]
  );

  const handleConnectionClose = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const handleConnectionData = useCallback(
    (data: EventPayload) => {
      if (data.event === HostEvent.UpdateHands) {
        updateHands(data.payload.hands);
      }

      if (data.event === HostEvent.AddHand) {
        addHand(data.payload.hand);
      }

      if (data.event === HostEvent.UpdateHand) {
        changeHandValue(data.payload.hand.id, data.payload.hand.value ?? null);
      }

      if (data.event === HostEvent.RevealHands) {
        revealHands();
      }

      if (data.event === HostEvent.ResetVoting) {
        resetVoting();
      }
      if (data.event === HostEvent.RemoveHand) {
        removeHand(data.payload.handId);
      }
    },
    [
      addHand,
      changeHandValue,
      removeHand,
      resetVoting,
      revealHands,
      updateHands,
    ]
  );

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
  }, [
    handleConnectionClose,
    handleConnectionData,
    handleConnectionOpen,
    roomId,
  ]);

  return {
    setup,
  };
}
