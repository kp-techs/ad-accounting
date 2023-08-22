import moment from "moment";
import { CreateLoans } from "../../types/models";
import { date, number, object, string } from "yup";

export const loansInitialFilterValues: LoansFilters = {
  startAmount_currentAmount: 0,
  endAmount_currentAmount: 0,
  startAmount_initialAmount: 0,
  endAmount_initialAmount: 0,
  startAmount_paidAmount: 0,
  endAmount_paidAmount: 0,
  loansNameID: null,
  creditorID: null,
  description: "",
  startDate: "",
  endDate: "",
};

const today = moment().format();
export const initialLoanValues: CreateLoans = {
  initialLoanAmount: 0,
  currentLoanAmount: 0,
  paidAmount: 0,
  creditorID: null,
  description: "",
  date: today,
  name: null,
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
