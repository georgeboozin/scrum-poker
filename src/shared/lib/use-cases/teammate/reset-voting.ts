import { useCallback } from "react";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useResetVoting() {
  const { changIsRevealed, resetHands }: HandsService = useHands();

  const handleResetVoting = useCallback(() => {
    resetHands();
    changIsRevealed(false);
  }, []);

  return { resetVoting: handleResetVoting };
}
