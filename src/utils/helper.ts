import { incomeTypeID } from "../pages/incomes/constants";
import { TableIncome } from "../types/models";
import moment from "moment";
import "moment/locale/es";

export function generateConcept({ type, ...income }: TableIncome) {
  return type === incomeTypeID.tithe
    ? `Diezmo: ${income.tithing?.name}`
    : type === incomeTypeID.event
    ? `${income.ministries?.name}: ${income.eventName}`
    : income.incomeTypes.name;
}

export function captalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDate(date: string | null) {
  moment.locale("es");
  const momentDate = moment(date);
  const daysPassed = moment().diff(moment(date, "YYYYMMDD"), "days");
  const yearsPassed = moment().diff(moment(date, "YYYYMMDD"), "year");

  if (daysPassed < 0) {
    const newDate = momentDate.fromNow();
    return captalize(newDate);
  } else if (daysPassed === 0) {
    return "Hoy";
  } else if (daysPassed < 7) {
    const day = momentDate.format("dddd");
    return captalize(day);
  } else if (yearsPassed === 0) {
    return momentDate.format("D [de] MMMM");
  } else {
    return momentDate.format("DD/MM/YY");
  }
}
