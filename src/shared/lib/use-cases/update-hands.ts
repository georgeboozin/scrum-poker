import { useCallback, useRef } from "react";
import { Hand } from "@/shared/domain/hand";
import { useHands } from "@/shared/lib/services/hands";
import { HandsService } from "@/shared/lib/use-cases/ports";

export function useUpdateHands() {
  const { hands, updateHands }: HandsService = useHands();
  const mutableHands = useRef<Hand[]>([]);
  mutableHands.current = hands;

  const handleUpdateHands = useCallback((newHands: Hand[]) => {
    updateHands([...mutableHands.current, ...newHands]);
  }, []);

  return { updateHands: handleUpdateHands };
}
