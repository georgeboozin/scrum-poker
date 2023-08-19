import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";
import type {
  StoreService,
  PeerManagerService,
} from "@/shared/lib/use-cases/ports";
import { useStore } from "@/shared/lib/services/store";
import { PeerManager } from "@/shared/lib/services/PeerManager";
import { PEER_JS_SERVER } from "@/shared/constants";

const peerManager: PeerManagerService = PeerManager.getInstance();

export function useCreateRoom() {
  const navigate = useNavigate();
  const { updateUser }: StoreService = useStore();

  const createRoom = useCallback(
    (name: string) => {
      const peer = new Peer(PEER_JS_SERVER);
      peerManager.setPeer(peer);
      peerManager.onOpen((id) => {
        console.log("Host registered", id);
        updateUser({
          id,
          name,
          isHost: true,
        });
        navigate(`/rooms/${id}`);
      });

      peerManager.onError((error) => {
        console.log("error", error);
      });
    },
    [navigate, updateUser]
  );

  return { createRoom };
}
