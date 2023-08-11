import { createContext } from "react";
import type { ReactNode } from "react";

import { useUser } from "@/hooks/use-user";
import { usePeerManager } from "@/hooks/use-peer-manager";

type AppContextType = ReturnType<typeof useUser> &
  ReturnType<typeof usePeerManager>;

export const AppContext = createContext<AppContextType | null>(null);

type UserProviderProps = {
  children?: ReactNode;
};

export function AppProvider({ children }: UserProviderProps) {
  const user = useUser();
  const peerManager = usePeerManager();
  const value = {
    ...user,
    ...peerManager,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
