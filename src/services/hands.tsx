import { createContext, useState, useContext, useCallback } from "react";
import type { ReactNode } from "react";
import {
  Hand,
  addHand,
  removeHand,
  changeHandValue,
  resetHands,
} from "@/domain/hand";
import { useStore } from "@/services/store";
import { HandsService } from "@/application/ports";

export const HandsContext = createContext<HandsService | null>(null);

type ProviderProps = {
  children?: ReactNode;
};

export function Provider({ children }: ProviderProps) {
  const {
    user: { id, name },
  } = useStore();
  const [hands, setHands] = useState<Hand[]>([{ id, name }]);

  const handleAddHand = useCallback((hand: Hand) => {
    setHands((prev) => addHand(prev, hand));
  }, []);

  const handleRemoveHand = useCallback((handId: string) => {
    setHands((prev) => removeHand(prev, handId));
  }, []);

  const handleResetHands = useCallback(() => {
    setHands((prev) => resetHands(prev));
  }, []);

  const handleChangeHandValue = useCallback(
    (handId: string, value: string | null) => {
      setHands((prev) => changeHandValue(prev, handId, value));
    },
    []
  );

  const value = {
    hands,
    addHand: handleAddHand,
    removeHand: handleRemoveHand,
    resetHands: handleResetHands,
    updateHands: setHands,
    changeHandValue: handleChangeHandValue,
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
