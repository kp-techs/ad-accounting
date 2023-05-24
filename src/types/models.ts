import { Database } from "./supabase";

type Tables = Database["public"]["Tables"];

export type Income = Tables["incomes"]["Row"];
