import { useCallback } from "react";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useChangeHandValue() {
  const { changeHandValue }: HandsService = useHands();

  const handleChangeHandValue = useCallback(
    (handId: string, value: string | null) => changeHandValue(handId, value),
    []
  );

  return { changeHandValue: handleChangeHandValue };
}
