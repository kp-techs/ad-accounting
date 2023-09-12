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
  loan: 1,
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
  date: date().required("Must specify the date"),
  amount: number()
    .min(1, "Must specify the amount")
    .required("Must specify the amount"),
  type: number().required("Must specify the outgoing's type"),
  beneficiaryID: number()
    .nullable()
    .when("type", {
      is: !outgoingTypeID.loan,
      then: () =>
        number().required("Must specify the beneficiary's name"),
    }),
  checkNumber: string().required("Must specify the check's number"),
});
