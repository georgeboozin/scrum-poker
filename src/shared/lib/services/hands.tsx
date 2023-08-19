import { createContext, useState, useContext, useCallback } from "react";
import type { ReactNode } from "react";
import {
  Hand,
  addHand,
  removeHand,
  changeHandValue,
  resetHands,
} from "@/shared/domain/hand";
import { useStore } from "@/shared/lib/services/store";
import { HandsService } from "@/shared/lib/use-cases/ports";

export const HandsContext = createContext<HandsService | null>(null);

type ProviderProps = {
  children?: ReactNode;
};

export function Provider({ children }: ProviderProps) {
  const {
    user: { id, name },
  } = useStore();
  const [hands, setHands] = useState<Hand[]>([{ id, name }]);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleAddHand = useCallback((hand: Hand) => {
    setHands((prev) => addHand(prev, hand));
  }, []);

  const handleRemoveHand = useCallback((handId: string) => {
    setHands((prev) => removeHand(prev, handId));
  }, []);

  const handleResetHands = useCallback(() => {
    setHands((prev) => resetHands(prev));
    setIsRevealed(false);
  }, []);

  const handleChangeHandValue = useCallback(
    (handId: string, value: string | null) => {
      setHands((prev) => changeHandValue(prev, handId, value));
    },
    []
  );

  const value = {
    hands,
    isRevealed,
    addHand: handleAddHand,
    removeHand: handleRemoveHand,
    resetHands: handleResetHands,
    updateHands: setHands,
    changeHandValue: handleChangeHandValue,
    changIsRevealed: setIsRevealed,
  };

  return (
    <HandsContext.Provider value={value}>{children}</HandsContext.Provider>
  );
}

export function useHands() {
  const handsContext = useContext(HandsContext);
  if (!handsContext) {
    throw new Error(`useHands must be used within a HandsContext`);
  }

  return handsContext;
}
