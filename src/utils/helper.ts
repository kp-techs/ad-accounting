import { incomeTypeID } from "../pages/incomes/constants";
import { TableIncome } from "../types/models";

export function generateConcept({ type, ...income }: TableIncome) {
  return type === incomeTypeID.tithe
    ? `Diezmo: ${income.tithing?.name}`
    : type === incomeTypeID.event
    ? `${income.ministries?.name}: ${income.eventName}`
    : income.incomeTypes.name;
}

export function formatMoney(amount: number | null) {
  if (amount) {
    const number = new Intl.NumberFormat("es-DO", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount);
    return `RD$ ${number}`;
  }
}
