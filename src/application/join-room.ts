import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStore } from "@/services/store";
import { peerManager } from "@/services/PeerManager";
import { Peer } from "peerjs";
import { PEER_JS_SERVER } from "@/constants";

export function useJoinRoom() {
  const { updateUser } = useStore();
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleJoinRoom = useCallback(
    (name: string) => {
      const peer = new Peer(PEER_JS_SERVER);
      peerManager.setPeer(peer);
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
