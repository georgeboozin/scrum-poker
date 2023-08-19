import { useCallback } from "react";
import { removeHand } from "@/shared/domain/hand";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useRemoveHand() {
  const { updateHands }: HandsService = useHands();

  const handleRemoveHand = useCallback(
    (handId: string) => {
      updateHands((prev) => removeHand(prev, handId));
    },
    [updateHands]
  );

  return { removeHand: handleRemoveHand };
}
