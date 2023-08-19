import { useCallback, useRef } from "react";
import { Hand } from "@/shared/domain/hand";
import { UserEvents } from "@/constants";
import {
  createAddUser,
  createChangeHand,
  createRemoveHand,
  createUpdateHands,
} from "@/shared/lib/services/event-creators";
import { peerManager } from "@/shared/lib/services/PeerManager";
import { DataConnection } from "peerjs";
import { useHands } from "@/shared/lib/services/hands";
import type { EventPayload } from "@/shared/kernel";
import {
  useRemoveHand,
  useAddHand,
  useChangeHandValue,
} from "@/shared/lib/use-cases/actions";

type Data = EventPayload;

export function useHostPeers() {
  const { removeHand } = useRemoveHand();
  const { addHand } = useAddHand();
  const { changeHandValue } = useChangeHandValue();
  const { hands } = useHands();
  const mutableHands = useRef<Hand[]>([]);
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

  const setup = useCallback(() => {
    peerManager.onConnection(handleConncetion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    setup,
  };
}
