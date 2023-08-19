import { useCallback } from "react";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useRevealHands() {
  const { changeIsRevealed }: HandsService = useHands();

  const handleRevealHands = useCallback(() => changeIsRevealed(true), []);

  return { revealHands: handleRevealHands };
}
