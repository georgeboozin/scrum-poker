import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/services/store";
import { Hand } from "@/domain/hand";
import { UserEvents } from "@/constants";
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

export function useHostRoom() {
  const { roomId } = useParams();
  const shouldAddPeerHanlders = useRef(true);
  const { user } = useStore();
  const { hands, addHand, removeHand, changeHandValue, resetHands } =
    useHands();
  const mutableHands = useRef<Hand[]>([]);
  const [isRevealed, setIsRevealed] = useState(false);
  mutableHands.current = hands;

  const handleConncetionOpen = useCallback((connection: DataConnection) => {
    const newHands = mutableHands.current;
    if (newHands.length !== 0) {
      const event = createUpdateHands(newHands);
      peerManager.send(event, connection.peer);
    }
  }, []);

  const handleConncetionClose = useCallback(
    (connection: DataConnection) => {
      const id = connection.peer;
      removeHand(id);
      const event = createRemoveHand(id);
      peerManager.broadcast(event, [connection.peer]);
    },
    [removeHand]
  );

  const handleConncetionData = useCallback(
    (connection: DataConnection, data: Data) => {
      if (data.event === UserEvents.SetName) {
        addHand({
          id: connection.peer,
          name: data.payload.name,
        });
        const event = createAddUser({
          id: connection.peer,
          name: data.payload.name,
        });
        peerManager.broadcast(event, [connection.peer]);
      }
      if (data.event === UserEvents.SelectCard) {
        const id = connection.peer;
        changeHandValue(id, data.payload.value);
        const event = createChangeHand({
          id,
          name: data.payload.name,
          value: data.payload.value,
        });
        peerManager.broadcast(event, [connection.peer]);
      }
    },
    [addHand, changeHandValue]
  );

  const handleConncetion = useCallback((connection: DataConnection) => {
    peerManager.onConnectionOpen(connection.peer, () =>
      handleConncetionOpen(connection)
    );
    peerManager.onConnectionClose(connection.peer, () =>
      handleConncetionClose(connection)
    );
    peerManager.onConnectionData<Data>(connection.peer, (data) =>
      handleConncetionData(connection, data)
    );
  }, []);

  const hostRoom = useCallback(() => {
    peerManager.onConnection(handleConncetion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectCard = useCallback(
    (value: string | null) => {
      const event = createChangeHand({
        id: String(roomId),
        name: String(user.name),
        value,
      });
      peerManager.broadcast(event);
      changeHandValue(user.id, value);
    },
    [changeHandValue, roomId, user]
  );

  const handleReveal = useCallback(() => {
    const event = createRevealCards();
    peerManager.broadcast(event);
    setIsRevealed(true);
  }, []);

  const handleNewVoting = useCallback(() => {
    const event = createResetVoting();
    peerManager.broadcast(event);
    resetHands();
    setIsRevealed(false);
  }, [resetHands]);

  useEffect(() => {
    if (shouldAddPeerHanlders.current) {
      shouldAddPeerHanlders.current = false;
      hostRoom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    handleSelectCard,
    handleReveal,
    handleNewVoting,
    isRevealed,
  };
}
