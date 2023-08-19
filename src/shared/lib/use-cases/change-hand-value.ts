import { useCallback } from "react";
import { changeHandValue } from "@/shared/domain/hand";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useChangeHandValue() {
  const { updateHands }: HandsService = useHands();

  const handleChangeHandValue = useCallback(
    (handId: string, value: string | null) =>
      updateHands((prev) => changeHandValue(prev, handId, value)),
    []
  );

  return { changeHandValue: handleChangeHandValue };
}
