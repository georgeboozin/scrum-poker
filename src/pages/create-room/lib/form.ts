import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";
import { useStore } from "@/shared/lib/services/store";
import { PEER_JS_SERVER } from "@/constants";
import { peerManager } from "@/shared/lib/services/PeerManager";

export function useForm() {
  const [name, setName] = useState("");
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setName(value);
    },
    []
  );

  return {
    name,
    handleNameChange,
  };
}

export function useCreateRoom() {
  const navigate = useNavigate();
  const { updateUser } = useStore();

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

  useEffect(() => {
    peerManager.closeConnections();
  }, []);

  return { createRoom };
}
