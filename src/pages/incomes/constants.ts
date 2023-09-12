import { CreateIncome } from "../../types/models";
import { object, string, date, number } from "yup";
import moment from "moment";

export const incomeTypeID = {
  tithe: 4,
  event: 2,
  loan: 1,
};

const today = moment().format();

export const initialIncome: CreateIncome = {
  date: "",
  amount: 0,
  createdBy: "",
  createdDate: today,
  updatedBy: "",
  updatedDate: null,
  comment: "",
  type: null,
  memberID: null,
  ministryID: null,
  eventName: "",
  concept: null,
  loanName: "",
  status: '',
  currentDebt: 0,
};

export const initialLoanIncome: CreateIncome = {
  date: "",
  amount: 0,
  createdBy: "",
  createdDate: today,
  updatedBy: "",
  updatedDate: null,
  comment: "",
  type: incomeTypeID.loan,
  memberID: null,
  ministryID: null,
  eventName: "",
  concept: null,
  loanName: "",
};

export const filterInitialValues: IncomesFilters = {
  type: null,
  memberID: null,
  ministryID: null,
  eventName: "",
  comment: "",
  startDate: "",
  endDate: "",
  startAmount: 0,
  endAmount: 0,
};

export const ValidationIncomeForm = object({
  date: date().required("Must specify the date"),
  amount: number()
    .min(1, "Must specify the amount")
    .required("Must specify the amount"),
  type: number().required("Must specify the income's type"),
  memberID: number()
    .nullable()
    .when("type", {
      is: incomeTypeID.tithe,
      then: () => number().required("Must specify the member's name"),
    }),
  ministryID: number()
    .nullable()
    .when("type", {
      is: incomeTypeID.event,
      then: () =>
        number().required("Must specify the ministry's name"),
    }),
  eventName: string().when("type", {
    is: incomeTypeID.event,
    then: () => string().required("Must specify the event's name"),
  }),
  loanName: string().when("type", {
    is: incomeTypeID.loan,
    then: () => string().required("Must specify the loan's name"),
  }),
});

export const ValidationLoanVersionForm = object({
  date: date().required("Must specify the date"),
  amount: number()
    .min(1, "Must specify the amount")
    .required("Must specify the amount"),
  loanName: string().when("type", {
    is: incomeTypeID.loan,
    then: () => string().required("Must specify the loan's name"),
  }),
});
