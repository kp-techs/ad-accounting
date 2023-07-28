

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
  creditors:number[] | null;
}

type ActivePage = "INCOME" | "OUTGOING" | "REPORTES" | "NONE";
