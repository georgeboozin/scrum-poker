import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/App";
import { HostEvents, UserEvents } from "@/constants";
import {
  Hand,
  createAddUser,
  createChangeHand,
  createRemoveHand,
  createSetHands,
  createSetName,
  createSelectCard,
  createRevealCards,
  createResetVoting,
} from "@/helpers/event-creators";

import { formatHands } from "./Room.utils";

type Data =
  | ReturnType<typeof createSetHands>
  | ReturnType<typeof createAddUser>
  | ReturnType<typeof createChangeHand>
  | ReturnType<typeof createRemoveHand>
  | ReturnType<typeof createRevealCards>
  | ReturnType<typeof createResetVoting>
  | ReturnType<typeof createSelectCard>
  | ReturnType<typeof createSetName>;

export function useRoom() {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const shouldAddPeerHanlders = useRef(true);
  const {
    user,
    connections,
    onConnection,
    onConnectionOpen,
    onConnectionClose,
    onConnectionData,
    send,
    broadcast,
    connect,
  } = useAppContext();
  const {
    hands,
    addHand,
    removeHand,
    changeHandValue,
    resetHands,
    setHands,
    userHand,
    setUserHand,
  } = useHands({
    id: user.id,
    name: user.name,
  });
  const [isRevealed, setIsRevealed] = useState(false);
  const mutableState = useRef({ userHand, hands });
  mutableState.current.userHand = userHand;
  mutableState.current.hands = hands;

  const hostRoom = useCallback(() => {
    onConnection((connection) => {
      onConnectionOpen(connection.peer, () => {
        const id = String(roomId);
        const newHands = formatHands(
          {
            id,
            name: String(mutableState.current.userHand?.name),
            value: mutableState.current.userHand?.value,
          },
          mutableState.current.hands
        );
        if (newHands.length !== 0) {
          const event = createSetHands(newHands);
          send(connection.peer, event);
        }
      });
      onConnectionClose(connection.peer, () => {
        const id = connection.peer;
        removeHand(id);
        const event = createRemoveHand(id);
        broadcast(event, [connection.peer]);
      });
      onConnectionData<Data>(connection.peer, (data) => {
        if (data.event === UserEvents.SetName) {
          addHand({
            id: connection.peer,
            name: data.payload.name,
          });
          const event = createAddUser({
            id: connection.peer,
            name: data.payload.name,
          });
          broadcast(event, [connection.peer]);
        }
        if (data.event === UserEvents.SelectCard) {
          const id = connection.peer;
          changeHandValue(id, data.payload.value);
          const event = createChangeHand({
            id,
            name: data.payload.name,
            value: data.payload.value,
          });
          broadcast(event, [connection.peer]);
        }
      });
    });
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    const connection = connect(roomId);
    if (connection) {
      onConnectionOpen(connection.peer, () => {
        const event = createSetName(String(user.name));
        send(connection.peer, event);
      });

      onConnectionClose(connection.peer, () => {
        navigate("/");
      });

      onConnectionData<Data>(connection.peer, (data) => {
        if (data.event === HostEvents.SetHands) {
          setHands(data.payload.hands);
        }

        if (data.event === HostEvents.AddUser) {
          addHand(data.payload.user);
        }

        if (data.event === HostEvents.ChangeHand) {
          changeHandValue(
            data.payload.hand.id,
            data.payload.hand.value ?? null
          );
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
      });
    }
  }, []);

  const handleSelectUserCard = useCallback(
    (value: string | null) => {
      const [connection] = Object.values(connections.current);
      const event = createSelectCard({ name: String(user.name), value });
      send(connection.peer, event);
    },
    [user]
  );

  const handleSelectHostCard = useCallback(
    (value: string | null) => {
      const event = createChangeHand({
        id: String(roomId),
        name: String(user.name),
        value,
      });
      console.log("event", event);
      broadcast(event);
    },
    [roomId, user]
  );

  const handleReveal = useCallback(() => {
    const event = createRevealCards();
    broadcast(event);
  }, []);

  const handleNewVoting = useCallback(() => {
    const event = createResetVoting();
    broadcast(event);
    resetHands();
  }, [resetHands]);

  useEffect(() => {
    if (shouldAddPeerHanlders.current) {
      shouldAddPeerHanlders.current = false;
      if (user.isHost) {
        hostRoom();
      }
      if (!user.isHost && roomId) {
        joinRoom(roomId);
      }
    }
  }, []);

  return {
    selectCard: user.isHost ? handleSelectHostCard : handleSelectUserCard,
    handleReveal,
    handleNewVoting,
    hands,
    userHand,
    setUserHand,
    setHands,
    isRevealed,
    setIsRevealed,
  };
}

export function useHands({ id, name, value }: Hand) {
  const [hands, setHands] = useState<Hand[]>([]);
  const [userHand, setUserHand] = useState<Hand>({ id, name, value });

  const addHand = useCallback((hand: Hand) => {
    setHands((prev) => {
      const newHands = [...prev, { id: hand.id, name: hand.name }];
      return newHands;
    });
  }, []);

  const removeHand = useCallback((handId: string) => {
    setHands((prev) => {
      const newHands = prev.filter((hand) => hand.id !== handId);
      return newHands;
    });
  }, []);

  const changeHandValue = useCallback(
    (handId: string, value: string | null) => {
      setHands((prev) => {
        const newHands = prev.reduce((acc, hand) => {
          if (hand.id === handId) {
            const newHand = {
              id: hand.id,
              name: hand.name,
              value: value,
            };
            acc.push(newHand);
          } else {
            acc.push(hand);
          }
          return acc;
        }, [] as Hand[]);

        return newHands;
      });
    },
    []
  );

  const resetHands = useCallback(() => {
    setHands((prev) => prev.map((hand) => ({ ...hand, value: null })));
    setUserHand((prev) => prev && { ...prev, value: null });
  }, []);

  return {
    hands,
    addHand,
    removeHand,
    changeHandValue,
    setHands,
    resetHands,
    userHand,
    setUserHand,
  };
}
