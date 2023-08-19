import { useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "@/services/store";
import { Hand } from "@/shared/domain/hand";
import {
  createSelectCard,
  createChangeHand,
  createRevealCards,
  createResetVoting,
} from "@/services/event-creators";
import { peerManager } from "@/services/PeerManager";
import { useHands } from "@/services/hands";
import { HandsService } from "@/application/ports";

export function useTeammateSelectCard() {
  const { user } = useStore();
  const { hands, changeHandValue }: HandsService = useHands();
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

export function useHostSelectCard() {
  const { roomId } = useParams();
  const { user } = useStore();
  const { changeHandValue }: HandsService = useHands();

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

  return { handleSelectCard };
}

export function useUpdateHands() {
  const { hands, updateHands }: HandsService = useHands();
  const mutableHands = useRef<Hand[]>([]);
  mutableHands.current = hands;

  const handleUpdateHands = useCallback((newHands: Hand[]) => {
    updateHands([...mutableHands.current, ...newHands]);
  }, []);

  return { updateHands: handleUpdateHands };
}

export function useAddHand() {
  const { addHand }: HandsService = useHands();

  const handleAddHand = useCallback((newHand: Hand) => addHand(newHand), []);

  return { addHand: handleAddHand };
}

export function useRemoveHand() {
  const { removeHand }: HandsService = useHands();

  const handleRemoveHand = useCallback(
    (handId: string) => removeHand(handId),
    []
  );

  return { removeHand: handleRemoveHand };
}

export function useChangeHandValue() {
  const { changeHandValue }: HandsService = useHands();

  const handleChangeHandValue = useCallback(
    (handId: string, value: string | null) => changeHandValue(handId, value),
    []
  );

  return { changeHandValue: handleChangeHandValue };
}

export function useTeammateRevealHands() {
  const { changIsRevealed }: HandsService = useHands();

  const handleRevealHands = useCallback(() => changIsRevealed(true), []);

  return { revealHands: handleRevealHands };
}

export function useHostRevealHands() {
  const { changIsRevealed }: HandsService = useHands();

  const handleRevealHands = useCallback(() => {
    const event = createRevealCards();
    peerManager.broadcast(event);
    changIsRevealed(true);
  }, []);

  return { revealHands: handleRevealHands };
}

export function useTeammateResetVoting() {
  const { changIsRevealed, resetHands }: HandsService = useHands();

  const handleResetVoting = useCallback(() => {
    resetHands();
    changIsRevealed(false);
  }, []);

  return { resetVoting: handleResetVoting };
}

export function useHostResetVoting() {
  const { changIsRevealed, resetHands }: HandsService = useHands();

  const handleResetVoting = useCallback(() => {
    const event = createResetVoting();
    peerManager.broadcast(event);
    resetHands();
    changIsRevealed(false);
  }, [resetHands, changIsRevealed]);

  return { resetVoting: handleResetVoting };
}
