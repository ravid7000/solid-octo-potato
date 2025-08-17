import React, { createContext } from "react";

export const VirtualTableContext = createContext<{
  header: React.ReactNode;
  top: number;
  setTop: (value: number) => void;
}>({
  header: <></>,
  top: 0,
  setTop: () => {},
});
