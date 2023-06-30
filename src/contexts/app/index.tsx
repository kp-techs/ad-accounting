import React, { createContext, FC, useState } from "react";
import { TableIncome, User } from "../../types/models";

const AppContext = createContext<AppContextType | null>(null);

type IncomesData = {
  data: TableIncome[];
  count: number;
};

type AppContextType = {
  incomes: IncomesData;
  setIncomes: React.Dispatch<React.SetStateAction<IncomesData>>;
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
};

type Props = {
  children: JSX.Element;
};

export const AppProvider: FC<Props> = ({ children }) => {
  const [incomes, setIncomes] = useState<IncomesData>({ data: [], count: 0 });
  const [users, setUsers] = useState<User[]>([]);

  const value = { incomes, setIncomes, users, setUsers };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
