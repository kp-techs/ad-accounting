import { CreateIncome } from "../../types/models";
import * as Yup from "yup";
import moment from "moment";

export const incomeTypeID = {
  tithe: 2,
  event: 13,
};
//TO DO: recibir el nombre del usuario que esta logeado.
const userName = "Jocelin Sanchez";
const today = moment().format();

export const initialIncome: CreateIncome = {
  date: "",
  amount: 0,
  createdBy: userName,
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

export const ValidationIncomeForm = Yup.object().shape({
  date: Yup.date().required("Favor especificar la fecha"),
  amount: Yup.number().min(1).required("Favor especificar el monto"),
  type: Yup.number().required("Favor especificar el tipo de ingreso"),
  tithingID: Yup.number()
    .nullable()
    .when("type", {
      is: incomeTypeID.tithe,
      then: () =>
        Yup.number().required("Favor especificar el nombre del diezmante"),
    }),
  ministryID: Yup.number()
    .nullable()
    .when("type", {
      is: incomeTypeID.event,
      then: () =>
        Yup.number().required("Favor especificar el nombre del ministerio"),
    }),
  eventName: Yup.string().when("type", {
    is: incomeTypeID.event,
    then: () => Yup.string().required("Favor especificar el nombre del evento"),
  }),
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
