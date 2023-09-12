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

export const paymentsFilterValues: PaymentsFilters = {
  beneficiaryID: null,
  checkNumber: '',
  startDate: '',
  endDate: '',
  description: '',
  startAmount: 0,
  endAmount: null,
}

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
  date: date().required("Must specify the date"),
  amount: number()
    .min(1, "Must specify the amount")
    .required("Must specify the amount"),
});

export const ValidationLoanForm = object({
  name: string().required("Must specify the loan's name"),
  date: date().required("Must specify the date"),
  initialLoanAmount: number()
    .min(1, "Must specify the amount")
    .required("Must specify the amount"),
  creditorID: number().required("Must specify the creditor name"),
});
