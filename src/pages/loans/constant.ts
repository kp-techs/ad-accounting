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
description: '',
startDate: '',
  endDate: '',

};

const today = moment().format();
export const initialLoanValues: CreateLoans = {
initialLoanAmount: 0,
currentLoanAmount: 0,
paidAmount: 0,
creditorID: null,
description: '',
date: today,
name: null,


}
export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "#83a3bbc9",
    boxShadow: "7px 13px 23px -2px rgba(0, 0, 0, 0.25)",
    borderRadius: "20px",
    fontFamily: "Poppins",
  },
};

export const ValidationLoanPaymentForm = object({
	date: date().required("Favor especificar la fecha"),
	amount: number().min(1, "Favor especificar el monto").required("Favor especificar el monto"),
})

export const ValidationLoanForm = object({
  name: string().required("Favor especificar el nombre del préstamo"),
  date: date().required("Favor especificar la fecha"),
	amount: number().min(1, "Favor especificar el monto").required("Favor especificar el monto"),

});
