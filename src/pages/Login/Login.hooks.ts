import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Peer } from "peerjs";
import { useAppContext } from "@/contexts/App";
import { PEER_JS_SERVER } from "@/constants";
import { PeerManager } from "@/services/PeerManager";

export const enum TypeConncetion {
  host = "host",
  participant = "participant",
}

export function useForm() {
  const [values, setValues] = useState({
    name: "",
    roomId: "",
    typeConncetion: TypeConncetion.host,
  });
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, name: value }));
    },
    []
  );
  const handleRoomIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setValues((prev) => ({ ...prev, roomId: value }));
    },
    []
  );
  const handleTypeConncetionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
      // TODO: remove
      console.log(e);
      setValues((prev) => ({
        ...prev,
        typeConncetion: value as TypeConncetion,
      }));
    },
    []
  );

  return {
    values,
    handleNameChange,
    handleRoomIdChange,
    handleTypeConncetionChange,
  };
}

export function useLogin() {
  const navigate = useNavigate();
  const { setUser } = useAppContext();
  const [roomId, setRoomId] = useState("");

  const createRoom = useCallback((name: string) => {
    const peerManager = PeerManager.Instance;
    peerManager.onOpen((id) => {
      console.log("Host registered", id);
      setUser({
        id,
        name,
        isHost: true,
      });
      navigate(`/rooms/${id}`);
    });

    peerManager.onError((error) => {
      console.log("error", error);
    });
  }, []);

  const joinRoom = useCallback((roomId: string) => {
    const peer = new Peer(PEER_JS_SERVER);
    peer.on("open", (id) => {
      console.log("Participant registered", id);
      navigate(`/rooms/${roomId}`);
    });
  }, []);

  return { roomId, createRoom, joinRoom, setRoomId };
}
