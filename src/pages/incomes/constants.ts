import { CreateIncome } from "../../types/models";
import { object, string, date, number } from "yup";
import moment from "moment";

export const incomeTypeID = {
  tithe: 2,
  event: 13,
  loan: 21,
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
  tithingID: null,
  ministryID: null,
  eventName: "",
  concept: null,
  loanName: "",
  loanID: null,
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
  tithingID: null,
  ministryID: null,
  eventName: "",
  concept: null,
  loanName: "",
};

export const filterInitialValues: IncomesFilters = {
  type: null,
  tithingID: null,
  ministryID: null,
  eventName: "",
  comment: "",
  startDate: "",
  endDate: "",
  startAmount: 0,
  endAmount: 0,
};

export const ValidationIncomeForm = object({
  date: date().required("Favor especificar la fecha"),
  amount: number()
    .min(1, "Favor especificar el monto")
    .required("Favor especificar el monto"),
  type: number().required("Favor especificar el tipo de ingreso"),
  tithingID: number()
    .nullable()
    .when("type", {
      is: incomeTypeID.tithe,
      then: () => number().required("Favor especificar el nombre del miembro"),
    }),
  ministryID: number()
    .nullable()
    .when("type", {
      is: incomeTypeID.event,
      then: () =>
        number().required("Favor especificar el nombre del ministerio"),
    }),
  eventName: string().when("type", {
    is: incomeTypeID.event,
    then: () => string().required("Favor especificar el nombre del evento"),
  }),
  loanName: string().when("type", {
    is: incomeTypeID.loan,
    then: () => string().required("Favor especificar el nombre del préstamo"),
  }),
});

export const ValidationLoanVersionForm = object({
  date: date().required("Favor especificar la fecha"),
  amount: number()
    .min(1, "Favor especificar el monto")
    .required("Favor especificar el monto"),
  loanName: string().required("Favor especificar el nombre del préstamo"),
});
