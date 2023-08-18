import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/services/store";
import { Hand } from "@/domain/hand";
import { HostEvents } from "@/constants";
import {
  createAddUser,
  createChangeHand,
  createRemoveHand,
  createUpdateHands,
  createSetName,
  createSelectCard,
  createRevealCards,
  createResetVoting,
} from "@/services/event-creators";
import { peerManager } from "@/services/PeerManager";
import { DataConnection } from "peerjs";
import { useHands } from "@/services/hands";

type Data =
  | ReturnType<typeof createUpdateHands>
  | ReturnType<typeof createAddUser>
  | ReturnType<typeof createChangeHand>
  | ReturnType<typeof createRemoveHand>
  | ReturnType<typeof createRevealCards>
  | ReturnType<typeof createResetVoting>
  | ReturnType<typeof createSelectCard>
  | ReturnType<typeof createSetName>;

export function useTeammateRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const shouldAddPeerHanlders = useRef(true);
  const {
    hands,
    addHand,
    removeHand,
    changeHandValue,
    resetHands,
    updateHands,
  } = useHands();
  const [userHand] = hands;
  const [isRevealed, setIsRevealed] = useState(false);
  const { user } = useStore();
  const mutableHands = useRef<Hand[]>([]);
  mutableHands.current = hands;

  const handleSelectCard = useCallback(
    (value: string | null) => {
      const event = createSelectCard({ name: String(user.name), value });
      peerManager.send(event);
      changeHandValue(userHand.id, value);
    },
    [user]
  );

  const handleConnectionOpen = useCallback((connection: DataConnection) => {
    const event = createSetName(String(user.name));
    peerManager.send(event, connection.peer);
  }, []);

  const handleConnectionClose = useCallback(() => {
    navigate("/");
  }, []);

  const handleConnectionData = useCallback((data: Data) => {
    if (data.event === HostEvents.UpdateHands) {
      updateHands([...mutableHands.current, ...data.payload.hands]);
    }

    if (data.event === HostEvents.AddUser) {
      addHand(data.payload.user);
    }

    if (data.event === HostEvents.ChangeHand) {
      changeHandValue(data.payload.hand.id, data.payload.hand.value ?? null);
    }
    if (data.event === HostEvents.RevealCards) {
      setIsRevealed(true);
    }

    if (data.event === HostEvents.ResetVoting) {
      resetHands();
      setIsRevealed(false);
    }
    if (data.event === HostEvents.RemoveHand) {
      removeHand(data.payload.handId);
    }
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    const connection = peerManager.connect(roomId);
    if (connection) {
      peerManager.onConnectionOpen(connection.peer, () =>
        handleConnectionOpen(connection)
      );
      peerManager.onConnectionClose(connection.peer, handleConnectionClose);
      peerManager.onConnectionData(connection.peer, handleConnectionData);
    }
  }, []);

  useEffect(() => {
    if (shouldAddPeerHanlders.current && roomId) {
      shouldAddPeerHanlders.current = false;
      joinRoom(roomId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isRevealed,
    handleSelectCard,
  };
}

// application

export function useSelectCard() {
  const { user } = useStore();
  const { hands, changeHandValue } = useHands();
  const [userHand] = hands;

  const handleSelectCard = useCallback(
    (value: string | null) => {
      const event = createSelectCard({ name: String(user.name), value });
      peerManager.send(event);
      changeHandValue(userHand.id, value);
    },
    [user]
  );

  return { handleSelectCard };
}
