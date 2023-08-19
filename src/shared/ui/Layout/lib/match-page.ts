import { useLocation, useParams } from "react-router-dom";

export function useMatchPage() {
  const { pathname } = useLocation();
  const { roomId } = useParams();
  const isRoom = pathname === `/rooms/${roomId}`;

  return {
    isRoom,
  };
}
