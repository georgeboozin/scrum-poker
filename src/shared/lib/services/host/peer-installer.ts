import { useCallback } from "react";
import { TeammateEvent } from "@/shared/kernel/teammate-events";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { DataConnection } from "peerjs";
import type { EventPayload } from "@/shared/kernel";
import { useAddHand } from "@/shared/lib/use-cases/add-hand";
import { useRemoveHand } from "@/shared/lib/use-cases/remove-hand";
import { useChangeHandValue } from "@/shared/lib/use-cases/change-hand-value";
import { useSendHands } from "@/shared/lib/use-cases/host/send-hands";
import { useSendRemovedHand } from "@/shared/lib/use-cases/host/send-removed-hand";
import { useSendNewHand } from "@/shared/lib/use-cases/host/send-new-hand";
import { useSendUpdatedHand } from "@/shared/lib/use-cases/host/send-updated-hand";

const peerManager = PeerManager.getInstance();

export function usePeerInstaller() {
  const { removeHand } = useRemoveHand();
  const { addHand } = useAddHand();
  const { changeHandValue } = useChangeHandValue();
  const { sendHands } = useSendHands();
  const { sendRemovedHand } = useSendRemovedHand();
  const { sendNewHand } = useSendNewHand();
  const { sendUpdatedHand } = useSendUpdatedHand();

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
      sendRemovedHand(id);
    },
    [removeHand, sendRemovedHand]
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
        sendNewHand(newHand, id);
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
        sendUpdatedHand(hand, id);
      }
    },
    [addHand, changeHandValue, sendNewHand, sendUpdatedHand]
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

  const install = useCallback(() => {
    peerManager.onConnection(handleConncetion);
  }, [handleConncetion]);

  return {
    install,
  };
}
