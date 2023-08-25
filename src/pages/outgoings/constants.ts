import moment from "moment";
import { CreateOutgoing } from "../../types/models";
import { object, string, date, number } from "yup";

export const outgoingsInitialValues: OutgoingsFilters = {
  type: null,
  beneficiaryID: null,
  checkNumber: "",
  startDate: "",
  endDate: "",
  description: "",
  startAmount: 0,
  endAmount: 0,
  loanID: null,
};

export const outgoingTypeID = {
  loan: 25,
};

const today = moment().format();
export const initialOutgoing: CreateOutgoing = {
  amount: 0,
  beneficiaryID: null,
  checkNumber: "",
  createdBy: "",
  createdDate: today,
  date: "",
  description: "",
  modifiedAt: null,
  modifiedBy: "",
  type: null,
  loanID: null,
};

export const initialLoanVersion: CreateOutgoing = {
  amount: 0,
  beneficiaryID: null,
  checkNumber: "",
  createdBy: "",
  createdDate: today,
  date: "",
  description: "",
  modifiedAt: null,
  modifiedBy: "",
  type: outgoingTypeID.loan,
  loanID: null,
};

export const ValidationOutgoingForm = object({
  date: date().required("Favor especificar la fecha"),
  amount: number()
    .min(1, "Favor especificar el monto")
    .required("Favor especificar el monto"),
  type: number().required("Favor especificar el tipo de egreso"),
  beneficiaryID: number()
    .nullable()
    .when("type", {
      is: !outgoingTypeID.loan,
      then: () =>
        number().required("Favor especificar el nombre del beneficiario"),
    }),
  checkNumber: string().required("Favor especificar el número de cheque"),
});
