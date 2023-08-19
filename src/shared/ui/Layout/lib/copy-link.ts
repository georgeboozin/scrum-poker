import { useCallback } from "react";
import { useParams } from "react-router-dom";

export function useCopyLink() {
  const { roomId } = useParams();

  const copyLink = useCallback(async () => {
    const url = `${location.origin}/rooms/${roomId}/join`;
    await navigator.clipboard.writeText(url);
  }, [roomId]);

  return {
    copyLink,
  };
}
