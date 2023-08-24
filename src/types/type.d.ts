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
  loanID: number | null;
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

type Filters = IncomesFilters | OutgoingsFilters | LoansFilters;

type ActivePage = "INCOME" | "OUTGOING" | "REPORTES" | "NONE";
