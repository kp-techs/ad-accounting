import { TableIncome } from "../types/models";

export function generateConcept({ type, ...income }: TableIncome) {
  return type === "Diezmos"
    ? `Diezmo: ${income.tithing?.name}`
    : type === "Evento"
    ? `${income.ministries?.ministry}: ${income.eventName}`
    : type;
}
