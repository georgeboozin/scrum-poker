import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useStore } from "@/services/store";
import { HostEvents } from "@/constants";
import { createSetName } from "@/services/event-creators";
import { peerManager } from "@/services/PeerManager";
import { DataConnection } from "peerjs";
import type { EventPayload } from "@/shared/kernel";
import {
  useUpdateHands,
  useAddHand,
  useRemoveHand,
  useChangeHandValue,
  useTeammateRevealHands,
  useTeammateResetVoting,
} from "@/application/actions";

type Data = EventPayload;

export function useTeammatePeers() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const { user } = useStore();
  const { updateHands } = useUpdateHands();
  const { addHand } = useAddHand();
  const { removeHand } = useRemoveHand();
  const { changeHandValue } = useChangeHandValue();
  const { revealHands } = useTeammateRevealHands();
  const { resetVoting } = useTeammateResetVoting();

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
