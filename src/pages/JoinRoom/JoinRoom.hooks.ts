import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Peer } from "peerjs";
import { PEER_JS_SERVER } from "@/constants";
import { useStore } from "@/services/store";
import { peerManager } from "@/services/PeerManager";

export function useForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { updateUser } = useStore();
  const [values, setValues] = useState({
    name: "",
  });

  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, name: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const peer = new Peer(PEER_JS_SERVER);
      peerManager.setPeer(peer);
      peerManager.onOpen((id) => {
        console.log("Participant registered", id);
        updateUser({
          id,
          name: values.name,
          isHost: false,
        });
        navigate(`/rooms/${roomId}`);
      });
    },
    [updateUser, values.name, navigate, roomId]
  );

  return {
    values,
    handleNameChange,
    handleSubmit,
  };
}
