import moment from "moment";
import { CreateIncome } from "../../types/models";
import { date, number, object, string } from "yup";

export const loansInitialFilterValues: LoansFilters = {
  description: '',
  loanName: '',
  startCurrentAmount: 0,
  startInitialAmount: 0,
  startPaidAmount: 0,
  startDate: '',
  endDate: '',
  endCurrentAmount: null,
  endInitialAmount: null,
  endPaidAmount: null,
  memberID: null,
};

const today = moment().format();
export const initialLoanValues: CreateIncome = {
  amount: 0,
  currentDebt: 0,
  paidAmount: 0,
  memberID: null,
  comment: "",
  date: today,
  loanName: null,
};

export const ValidationLoanPaymentForm = object({
  date: date().required("Favor especificar la fecha"),
  amount: number()
    .min(1, "Favor especificar el monto")
    .required("Favor especificar el monto"),
});

export const ValidationLoanForm = object({
  name: string().required("Favor especificar el nombre del préstamo"),
  date: date().required("Favor especificar la fecha"),
  initialLoanAmount: number()
    .min(1, "Favor especificar el monto")
    .required("Favor especificar el monto"),
  creditorID: number().required("Favor especificar acreedor"),
});
