//TO DO: crear validacion para subir formulario Formik

import moment from "moment";
import { CreateOutgoing } from "../../types/models";

export const outgoingsInitialValues: OutgoingsFilters = {
	type: null,
	beneficiaryID: null,
	creditors: null,
	checkNumber: "",
	startDate: "",
	endDate: "",
	description: "",
	startAmount: 0,
	endAmount: 0
};

export const outgoingTypeID = {
	loan:25,
}
const today = moment().format();
export const initialOutgoing: CreateOutgoing = {
	amount:0,
	beneficiaryID: null,
	checkNumber:'',
	createdBy: '',
	createdDate: today,
	date: '',
	description: '',
	modifiedAt: null,
	modifiedBy: '',
	type: null,
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


//ESTE ES EL EJEMPLO DE COMO SE HIZO EN INCOMES:

// export const ValidationIncomeForm = object({
//   date: date().required("Favor especificar la fecha"),
//   amount: number().min(1).required("Favor especificar el monto"),
//   type: number().required("Favor especificar el tipo de ingreso"),
//   tithingID: number()
//     .nullable()
//     .when("type", {
//       is: incomeTypeID.tithe,
//       then: () =>
//         number().required("Favor especificar el nombre del diezmante"),
//     }),
//   ministryID: number()
//     .nullable()
//     .when("type", {
//       is: incomeTypeID.event,
//       then: () =>
//         number().required("Favor especificar el nombre del ministerio"),
//     }),
//   eventName: string().when("type", {
//     is: incomeTypeID.event,
//     then: () => string().required("Favor especificar el nombre del evento"),
//   }),
// });

// export const validationNewUserForm = object({
//   name:string().required("Favor introducir nombre de usuario."),
//   password:string().required("Favor introducir contraseña."),
//   confirmPassword:string().required("Favor reescribir su contraseña.").oneOf([ref("password")],'La contraseñas introducidas no coinciden'),
// });