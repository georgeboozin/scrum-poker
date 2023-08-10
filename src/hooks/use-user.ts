import { useState } from "react";

interface User {
  id: string;
  name: string;
  isHost: boolean;
}

export function useUser() {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    isHost: false,
  });

  return {
    user,
    setUser,
  };
}
