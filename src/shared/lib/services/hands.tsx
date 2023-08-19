import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import type { Hand } from "@/shared/domain/hand";
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

  const value = {
    hands,
    isRevealed,
    updateHands: setHands,
    changeIsRevealed: setIsRevealed,
  };

  return (
    <HandsContext.Provider value={value}>{children}</HandsContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useHands() {
  const handsContext = useContext(HandsContext);
  if (!handsContext) {
    throw new Error(`useHands must be used within a HandsContext`);
  }

  return handsContext;
}
