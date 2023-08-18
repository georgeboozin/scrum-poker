import { useState } from "react";
import { User } from "@/domain/user";

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
