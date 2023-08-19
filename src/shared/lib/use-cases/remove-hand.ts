import { useCallback } from "react";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useRemoveHand() {
  const { removeHand }: HandsService = useHands();

  const handleRemoveHand = useCallback(
    (handId: string) => removeHand(handId),
    []
  );

  return { removeHand: handleRemoveHand };
}
