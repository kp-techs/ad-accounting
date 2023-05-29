import React, { createContext, FC, useState } from "react";
import { TableIncome } from "../../types/models";

const AppContext = createContext<AppContextType | null>(null);

type AppContextType = [
  TableIncome[],
  React.Dispatch<React.SetStateAction<TableIncome[]>>
];

type Props = {
  children: JSX.Element[];
};

export const AppProvider: FC<Props> = ({ children }) => {
  const value = useState<TableIncome[]>([]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
