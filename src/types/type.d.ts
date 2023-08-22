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
  tithingID: number[] | null;
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
  loanID: number | null;
};

type LoansFilters = {
  startAmount_currentAmount: number | null;
  endAmount_currentAmount: number | null;
  startAmount_initialAmount: number | null;
  endAmount_initialAmount: number | null;
  startAmount_paidAmount: number | null;
  endAmount_paidAmount: number | null;
  loansNameID: number[] | null;
  creditorID: number[] | null;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
};

type Filters = IncomesFilters | OutgoingsFilters | LoansFilters;

type ActivePage = "INCOME" | "OUTGOING" | "REPORTES" | "NONE";
