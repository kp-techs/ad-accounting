import { CreateIncome } from "../../types/models";

export const initialIncome: CreateIncome = {
  date: "",
  amount: 0,
  createdBy: "",
  createdDate: null,
  updatedBy: "",
  updatedDate: null,
  comment: "",
  type: null,
  tithingID: null,
  ministryID: null,
  eventName: "",
  concept: null,
};

export const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export const incomeTypeID = {
  tithe: 2,
  event: 13,
};
