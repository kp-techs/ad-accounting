import { Database } from "./supabase";

export type Tables = Database["public"]["Tables"];

export type User = Tables["users"]["Row"];

export type People = Tables["people"]["Row"];

export type Income = Tables["incomes"]["Row"];
export type Ministries = Tables["ministries"]["Row"];
export type IncomeType = Tables["incomeTypes"]["Row"];
export type CreateIncome = Tables["incomes"]["Insert"];

export type TableIncome = Income & {
  people: People;
  ministries: Ministries;
  incomeTypes: IncomeType;
};

export type Outgoing = Tables["outgoings"]["Row"];
export type OutgoingTypes = Tables["outgoingTypes"]["Row"];
export type CreateOutgoing = Tables["outgoings"]["Insert"];
export type TableOutgoing = Outgoing & {
  people: People;
  outgoingTypes: OutgoingTypes;
  incomes: TableIncome;
};

export type TableData = TableIncome | TableOutgoing;

export type TablePeople = Tables["people"]["Row"];
export type TableMinistries = Tables["ministries"]["Row"];
export type TableIncomeTypes = Tables["incomeTypes"]["Row"];
export type TableOutgoingTypes = Tables["outgoingTypes"]["Row"];
export type Option =
  (TablePeople
    | TableMinistries
    | TableIncomeTypes
    | TableOutgoingTypes) & { deletable?: boolean };
