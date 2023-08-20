import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type {
  StoreService,
  PeerManagerService,
} from "@/shared/lib/use-cases/ports";
import { useStore } from "@/shared/lib/services/store";
import { PeerManager } from "@/shared/lib/services/PeerManager";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useJoinRoom() {
  const { updateUser }: StoreService = useStore();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleJoinRoom = useCallback(
    (name: string) => {
      peerManager.onOpen((id) => {
        console.log("Participant registered", id);
        updateUser({
          id,
          name,
          isHost: false,
        });
        navigate(`/rooms/${roomId}`);
      });
    },
    [navigate, roomId, updateUser]
  );

  return { joinRoom: handleJoinRoom };
}
