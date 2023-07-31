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

type AppContextType = {
	incomes: IncomesData;
	setIncomes: React.Dispatch<React.SetStateAction<IncomesData>>;
	users: User[];
	setUsers: React.Dispatch<React.SetStateAction<User[]>>;
	profile: User | null;
	setProfile: React.Dispatch<React.SetStateAction<User | null>>;
	outgoings: OutgoingsData;
	setOuts: React.Dispatch<React.SetStateAction<OutgoingsData>>;
};

type Props = {
	children: JSX.Element;
};

export const AppProvider: FC<Props> = ({ children }) => {
	const [incomes, setIncomes] = useState<IncomesData>({ data: [], count: 0 });
	const [users, setUsers] = useState<User[]>([]);
  const [profile, setProfile] = useState<User | null>(null);
  const [outgoings, setOuts] = useState<OutgoingsData>({ data: [], count: 0 });

	const value = { incomes, setIncomes, users, setUsers, profile, setProfile, outgoings, setOuts };
	return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;
