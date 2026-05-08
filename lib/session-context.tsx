"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { UserPayload } from "./session";

const SessionContext = createContext<UserPayload | null>(null);

export function SessionProvider({
  payload,
  children,
}: {
  payload: UserPayload | null;
  children: ReactNode;
}) {
  return (
    <SessionContext.Provider value={payload}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession(): UserPayload | null {
  return useContext(SessionContext);
}
