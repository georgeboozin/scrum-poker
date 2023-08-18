import { useCallback, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

export function useLayout() {
  const { pathname } = useLocation();
  const [notification, setNotification] = useState({
    message: "",
    isOpen: false,
  });
  const { roomId } = useParams();
  const isRoom =
    pathname === `/rooms/${roomId}` || pathname === `/rooms/${roomId}/host`;

  const handleInvite = useCallback(async () => {
    const url = `${location.origin}/rooms/${roomId}/join`;
    try {
      await navigator.clipboard.writeText(url);
      setNotification({
        message: "Invitation link copied",
        isOpen: true,
      });
    } catch (e) {
      setNotification({
        message: "Invitation link wasn't copy",
        isOpen: true,
      });
    }
  }, [roomId]);

  const handleCloseNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    isRoom,
    handleInvite,
    handleCloseNotification,
    notification,
  };
}
