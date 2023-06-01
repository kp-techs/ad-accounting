import { incomeTypeID } from "../pages/incomes/constants";
import { TableIncome } from "../types/models";

export function generateConcept({ type, ...income }: TableIncome) {
  return type === incomeTypeID.tithe
    ? `Diezmo: ${income.tithing?.name}`
    : type === incomeTypeID.event
    ? `${income.ministries?.name}: ${income.eventName}`
    : income.incomeTypes.name;
}
