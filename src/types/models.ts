import { Database } from "./supabase";


export type Tables = Database["public"]["Tables"];

export type User = Tables["users"]["Row"];

export type Income = Tables["incomes"]["Row"];
export type CreateIncome = Tables["incomes"]["Insert"];
export type IncomeType = Tables["incomeTypes"]["Row"];
export type Tithing = Tables["tithing"]["Row"];
export type Ministries = Tables["ministries"]["Row"];
export type TableIncome = Income & {
  tithing: Tithing;
  ministries: Ministries;
  incomeTypes: IncomeType;
};

export type Outgoing = Tables["outgoings"]["Row"];
export type CreateOutgoing = Tables["outgoings"]["Insert"];
export type Beneficiaries = Tables["beneficiaries"]["Row"];
export type OutgoingTypes = Tables["outgoingTypes"]["Row"];
export type Loans = Tables["loans"]["Row"];
export type Creditors = Tables["creditors"]["Row"];

export type TableOutgoing = Outgoing & {
  beneficiaries: Beneficiaries;
  outgoingTypes: OutgoingTypes;
  loans: Loans;
  creditors: Creditors;


}
