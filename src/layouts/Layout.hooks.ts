import { useCallback, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export function useLayout() {
  const { pathname } = useLocation();
  const [isOpenNotification, setIsOpenNotification] = useState(false);
  const { roomId } = useParams();
  const isRoom =
    pathname === `/rooms/${roomId}` || pathname === `/rooms/${roomId}/host`;

  const handleInvite = useCallback(() => {
    const url = `${location.origin}/rooms/${roomId}/join`;
    navigator.clipboard.writeText(url);
    setIsOpenNotification(true);
  }, [roomId]);

  const handleCloseNotification = useCallback(() => {
    setIsOpenNotification(false);
  }, []);

  return { isRoom, isOpenNotification, handleInvite, handleCloseNotification };
}
