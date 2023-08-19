import { useCallback } from "react";
import { TeammateEvent } from "@/shared/kernel/teammate-events";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { DataConnection } from "peerjs";
import type { EventPayload } from "@/shared/kernel";
import { useAddHand } from "@/shared/lib/use-cases/add-hand";
import { useRemoveHand } from "@/shared/lib/use-cases/remove-hand";
import { useChangeHandValue } from "@/shared/lib/use-cases/change-hand-value";
import { useSendHands } from "@/shared/lib/use-cases/host/send-hands";
import { useSendRemoveHand } from "@/shared/lib/use-cases/host/send-remove-hand";
import { useSendAddHand } from "@/shared/lib/use-cases/host/send-add-hand";
import { useSendUpdateHand } from "@/shared/lib/use-cases/host/send-update-hand";

const peerManager = PeerManager.getInstance();

export function usePeer() {
  const { removeHand } = useRemoveHand();
  const { addHand } = useAddHand();
  const { changeHandValue } = useChangeHandValue();
  const { sendHands } = useSendHands();
  const { sendRemoveHand } = useSendRemoveHand();
  const { sendAddHand } = useSendAddHand();
  const { sendUpdateHand } = useSendUpdateHand();

  const handleConncetionOpen = useCallback(
    (connection: DataConnection) => {
      sendHands(connection.peer);
    },
    [sendHands]
  );

  const handleConncetionClose = useCallback(
    (connection: DataConnection) => {
      const id = connection.peer;
      removeHand(id);
      sendRemoveHand(id);
    },
    [removeHand, sendRemoveHand]
  );

  const handleConncetionData = useCallback(
    (connection: DataConnection, data: EventPayload) => {
      if (data.event === TeammateEvent.AddHand) {
        const id = connection.peer;
        const newHand = {
          id,
          name: String(data.payload.hand.name),
        };
        addHand(newHand);
        sendAddHand(newHand, id);
      }
      if (data.event === TeammateEvent.UpdateHand) {
        const id = connection.peer;
        const { name, value } = data.payload.hand;
        const hand = {
          id,
          name,
          value,
        };
        changeHandValue(id, value ?? null);
        sendUpdateHand(hand, id);
      }
    },
    [addHand, changeHandValue, sendAddHand, sendUpdateHand]
  );

  const handleConncetion = useCallback(
    (connection: DataConnection) => {
      peerManager.onConnectionOpen(connection.peer, () =>
        handleConncetionOpen(connection)
      );
      peerManager.onConnectionClose(connection.peer, () =>
        handleConncetionClose(connection)
      );
      peerManager.onConnectionData<EventPayload>(connection.peer, (data) =>
        handleConncetionData(connection, data)
      );
    },
    [handleConncetionClose, handleConncetionData, handleConncetionOpen]
  );

  const setup = useCallback(() => {
    peerManager.onConnection(handleConncetion);
  }, [handleConncetion]);

  return {
    setup,
  };
}
