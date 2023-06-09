import { Database } from "./supabase";

export type Tables = Database["public"]["Tables"];

export type Income = Tables["incomes"]["Row"];

type Create<B> = Omit<B, "id"> & { id?: number | null };

export type CreateIncome = Create<Income>;

export type IncomeType = Tables["incomeTypes"]["Row"];
export type Tithing = Tables["tithing"]["Row"];
export type Ministries = Tables["ministries"]["Row"];

export type TableIncome = Income & {
  tithing: Tithing;
  ministries: Ministries;
  incomeTypes: IncomeType;
};
