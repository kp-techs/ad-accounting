import { CreateIncome } from "../../types/models";
import { object, string, date, number, ref } from "yup";
import moment from "moment";

export const incomeTypeID = {
	tithe: 2,
	event: 13,
	loan: 21
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
	endAmount: 0
};

export const ValidationIncomeForm = object({
	date: date().required("Favor especificar la fecha"),
	amount: number().min(1, "Favor especificar el monto").required("Favor especificar el monto"),
	type: number().required("Favor especificar el tipo de ingreso"),
	tithingID: number()
		.nullable()
		.when("type", {
			is: incomeTypeID.tithe,
			then: () => number().required("Favor especificar el nombre del diezmante"),
			otherwise: () => number().required("Favor especificar el nombre del acreedor")
		}),
	ministryID: number()
		.nullable()
		.when("type", {
			is: incomeTypeID.event,
			then: () => number().required("Favor especificar el nombre del ministerio")
		}),
	eventName: string().when("type", {
		is: incomeTypeID.event,
		then: () => string().required("Favor especificar el nombre del evento")
	}),
	loanName: string().when("type", {
		is: incomeTypeID.loan,
		then: () => string().required("Favor especificar el nombre del préstamo")
	})
});

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
		fontFamily: "Poppins"
	}
};
