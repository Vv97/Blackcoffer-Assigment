import { createContext, ReactNode, useState } from "react";
import { DashboardContext, DashboardItem } from "../types/dashboard.types";

export const dashBoardContext = createContext<DashboardContext>({
  data: [],
  setData: () => {},
});

export const DashBoardContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<DashboardItem[]>([]);
  return (
    <dashBoardContext.Provider value={{ data, setData }}>
      {children}
    </dashBoardContext.Provider>
  );
};
