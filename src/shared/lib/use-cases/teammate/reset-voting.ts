import { useCallback } from "react";
import { resetHands } from "@/shared/domain/hand";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useResetVoting() {
  const { changeIsRevealed, updateHands }: HandsService = useHands();

  const handleResetVoting = useCallback(() => {
    updateHands((prev) => resetHands(prev));
    changeIsRevealed(false);
  }, [changeIsRevealed, updateHands]);

  return { resetVoting: handleResetVoting };
}
