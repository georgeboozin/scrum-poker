import { useCallback, useState } from "react";

export function useNotification() {
  const [notification, setNotification] = useState({
    message: "",
    isOpen: false,
  });

  const handleCloseNotification = useCallback(() => {
    setNotification((prev) => ({ ...prev, isOpen: false }));
  }, []);

  return {
    handleCloseNotification,
    notification,
    updateNotification: setNotification,
  };
}
