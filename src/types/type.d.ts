type UserData = {
  name: string | null;
  lastName: string | null;
  password: string;
  confirmPassword: string;
  email: string | null;
  rol: string | null;
  invitationText: string | null;
};

type IncomesFilters = {
  type: number[] | null;
  memberID: number[] | null;
  ministryID: number[] | null;
  eventName: string | null;
  comment: string | null;
  startDate: string | null;
  endDate: string | null;
  startAmount: number | null;
  endAmount: number | null;
};

type OutgoingsFilters = {
  type: number[] | null;
  beneficiaryID: number[] | null;
  checkNumber: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  startAmount: number | null;
  endAmount: number | null;
  loanID: number | null | undefined;
};

type LoansFilters = {
  description: string | null;
  loanName: string | null;
  startCurrentAmount: number | null;
  startInitialAmount: number | null;
  startPaidAmount: number | null;
  startDate: string | null;
  endDate: string | null;
  endCurrentAmount: number | null;
  endInitialAmount: number | null;
  endPaidAmount: number | null;
  memberID: number[] | null;
};

type PaymentsFilters = {
  beneficiaryID: number[] | null;
  checkNumber: string | null;
  startDate: string | null;
  endDate: string | null;
  description: string | null;
  startAmount: number | null;
  endAmount: number | null;
};

type ReporteFilters = {
  tables: string[]|null;
  startDate: string | null;
  endDate: string | null;
}

type Dataset = {
  month?: string[],
  amount: number[]
}

type AmoutHistory = {
  month: string;
  amount: number;
}

type ChartConfig = {
  table: string,
  label:string,
  backgroundColor?: string,
  borderColor?: string,
  pointBackgroundColor?: string,
  pointBorderColor?: string,
}

type Filters = IncomesFilters | OutgoingsFilters | LoansFilters | PaymentsFilters;

type ActivePage = "INCOME" | "OUTGOING" | "REPORTES" | 'LOANS' | "NONE";
