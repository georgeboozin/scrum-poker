import { useCallback } from "react";
import { Hand } from "@/shared/domain/hand";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useAddHand() {
  const { addHand }: HandsService = useHands();

  const handleAddHand = useCallback((newHand: Hand) => addHand(newHand), []);

  return { addHand: handleAddHand };
}
