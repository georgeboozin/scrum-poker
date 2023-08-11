import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";
import { useAppContext } from "@/contexts/App";
import { PEER_JS_SERVER } from "@/constants";

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
  const { setUser, setPeerManager, onOpen, onError, closeConnections } =
    useAppContext();

  const createRoom = useCallback(
    (name: string) => {
      const peer = new Peer(PEER_JS_SERVER);
      setPeerManager(peer);
      onOpen((id) => {
        console.log("Host registered", id);
        setUser({
          id,
          name,
          isHost: true,
        });
        navigate(`/rooms/${id}`);
      });

      onError((error) => {
        console.log("error", error);
      });
    },
    [navigate, onError, onOpen, setPeerManager, setUser]
  );

  useEffect(() => {
    closeConnections();
  }, []);

  return { createRoom };
}
