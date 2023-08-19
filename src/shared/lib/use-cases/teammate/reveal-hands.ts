import { useCallback } from "react";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useRevealHands() {
  const { changIsRevealed }: HandsService = useHands();

  const handleRevealHands = useCallback(() => changIsRevealed(true), []);

  return { revealHands: handleRevealHands };
}
