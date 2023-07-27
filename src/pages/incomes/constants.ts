import { CreateIncome } from "../../types/models";
import * as Yup from "yup";
import { object, string, date, number, ref } from "yup";
import moment from "moment";

export const incomeTypeID = {
  tithe: 2,
  event: 13,
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
};

export const filterInitialValues: Filters = {
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
  amount: number().min(1).required("Favor especificar el monto"),
  type: number().required("Favor especificar el tipo de ingreso"),
  tithingID: number()
    .nullable()
    .when("type", {
      is: incomeTypeID.tithe,
      then: () =>
        number().required("Favor especificar el nombre del diezmante"),
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
});

export const validationNewUserForm = object({
  name:string().required("Favor introducir nombre de usuario."),
  password:string().required("Favor introducir contraseña."),
  confirmPassword:string().required("Favor reescribir su contraseña.").oneOf([ref("password")],'La contraseñas introducidas no coinciden'),
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
    fontFamily: "Poppins",
  },
};
