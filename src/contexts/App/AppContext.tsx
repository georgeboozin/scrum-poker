import { createContext } from "react";
import type { ReactNode } from "react";

import { useUser } from "@/hooks/use-user";

type AppContextType = ReturnType<typeof useUser>;

export const AppContext = createContext<AppContextType | null>(null);

type UserProviderProps = {
  children?: ReactNode;
};

export function AppProvider({ children }: UserProviderProps) {
  const user = useUser();
  const value = {
    ...user,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
