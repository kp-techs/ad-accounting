import React, { createContext, FC, useState } from "react";
import { TableIncome } from "../../types/models";

const AppContext = createContext<AppContextType | null>(null);

type IncomesData = {
  data: TableIncome[];
  count: number;
};

type AppContextType = [
  IncomesData,
  React.Dispatch<React.SetStateAction<IncomesData>>
];

type Props = {
  children: JSX.Element;
};

export const AppProvider: FC<Props> = ({ children }) => {
  const value = useState<IncomesData>({ data: [], count: 0 });
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
