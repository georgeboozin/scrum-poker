import { useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "@/contexts/App";
import { PeerManager } from "@/services/PeerManager";

export function useForm() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { setUser } = useAppContext();
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
      const peerManager = PeerManager.Instance;
      peerManager.onOpen((id) => {
        console.log("Participant registered", id);
        setUser({
          id,
          name: values.name,
          isHost: false,
        });
        navigate(`/rooms/${roomId}`);
      });
    },
    [values, roomId, navigate, setUser]
  );

  return {
    values,
    handleNameChange,
    handleSubmit,
  };
}
