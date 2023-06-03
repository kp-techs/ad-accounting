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

export function formatDate(date: string | null) {
  moment.locale("es");
  const formattedDate = moment(date, "YYYYMMDD");
  const daysPassed = moment().diff(formattedDate, "days");
  const yearsPassed = moment().diff(formattedDate, "year");

  if (daysPassed < 0) {
    //tiempo aproximado
    let newDate = moment(date).fromNow();
    return newDate.charAt(0).toUpperCase() + newDate.slice(1);
  } else if (daysPassed === 0) {
    return "Hoy";
  } else if (daysPassed < 7) {
    // dia de la semana
    let newDate = moment(date).format("dddd");
    return newDate.charAt(0).toLocaleUpperCase() + newDate.slice(1);
  } else if (yearsPassed === 0) {
    // dia mes
    return moment(date).format("D [de] MMMM");
  } else {
    return moment(date).format("DD/MM/YY");
  }
}
