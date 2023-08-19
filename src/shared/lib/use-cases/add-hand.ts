import { useCallback } from "react";
import { Hand, addHand } from "@/shared/domain/hand";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useAddHand() {
  const { updateHands }: HandsService = useHands();

  const handleAddHand = useCallback(
    (newHand: Hand) => updateHands((prev) => addHand(prev, newHand)),
    []
  );

  return { addHand: handleAddHand };
}
