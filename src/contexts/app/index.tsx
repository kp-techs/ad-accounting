import React, { createContext, FC, useState } from "react";
import { TableIncome, TableOutgoing, User } from "../../types/models";

const AppContext = createContext<AppContextType | null>(null);

type IncomesData = {
	data: TableIncome[];
	count: number;
};

type OutgoingsData = {
	data: TableOutgoing[];
	count: number;
};

type OutgoingsData = {
  data: TableOutgoing[];
  count: number;
}

type AppContextType = {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;

  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>

  incomes: IncomesData;
  setIncomes: React.Dispatch<React.SetStateAction<IncomesData>>;

  outgoings: OutgoingsData;
  setOuts: React.Dispatch<React.SetStateAction<OutgoingsData>>
};

type Props = {
	children: JSX.Element;
};

export const AppProvider: FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [profile, setProfile] = useState<User | null>(null);
  const [incomes, setIncomes] = useState<IncomesData>({ data: [], count: 0 });
  const [outgoings, setOuts] = useState<OutgoingsData>({ data: [], count: 0 });


  const value = { users, setUsers, profile, setProfile, incomes, setIncomes, outgoings, setOuts };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
