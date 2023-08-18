import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";
import { User } from "@/domain/user";

function useUser() {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    isHost: false,
  });

  return { user, updateUser: setUser };
}

export const StoreContext = createContext<ReturnType<typeof useUser> | null>(
  null
);

type ProviderProps = {
  children?: ReactNode;
};

export function Provider({ children }: ProviderProps) {
  const user = useUser();
  const value = {
    ...user,
  };
  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const storeContext = useContext(StoreContext);
  if (!storeContext) {
    throw new Error(`useStore must be used within a StoreContext`);
  }

  return storeContext;
}
