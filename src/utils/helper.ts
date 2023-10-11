import { outgoingTypeID } from "./../pages/outgoings/constants";
import { incomeTypeID } from "../pages/incomes/constants";
import { TableIncome, TableOutgoing } from "../types/models";
import moment from "moment";
import "moment/locale/es";

export function generateConcept({ type, ...income }: TableIncome) {
  try {
    return type === incomeTypeID.tithe
      ? `Diezmo: ${income.people?.name}`
      : type === incomeTypeID.event
        ? `${income.ministries?.name}: ${income.eventName}`
        : type === incomeTypeID.loan
          ? `${income.incomeTypes?.name}: ${income.loanName}`
          : income.incomeTypes?.name;
  } catch (error) {
    return ''
  }
}

export function formatMoney(amount: number | null) {
  if (amount) {
    const number = new Intl.NumberFormat("es-DO", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    }).format(amount);
    return `RD$ ${number}`;
  }
  return "—";
}

export function capitalize(str: string | null) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTableDate(date: string | null) {
  if (!date) return "—";
  moment.locale("es-do");
  const momentDate = moment(date);
  const daysPassed = moment().diff(moment(date, "YYYYMMDD"), "days");
  const yearsPassed = moment().diff(moment(date, "YYYYMMDD"), "year");

  if (daysPassed < 0) {
    const newDate = momentDate.fromNow();
    return capitalize(newDate);
  } else if (daysPassed === 0) {
    return "Hoy";
  } else if (daysPassed < 7) {
    const day = momentDate.format("dddd");
    return capitalize(day);
  } else if (yearsPassed === 0) {
    return momentDate.format("D [de] MMMM");
  } else {
    return momentDate.format("DD/MM/YY");
  }
}
export function getMonth (date: string | null){
  moment.locale("es");
  if (date) return capitalize(moment(date).format('MMMM'));
}

export function formatDate(date: string | null) {
  if (date) return moment(date).format("DD [de] MMMM, YYYY");
  return "—";
}

export function formatLongDate(date: string | null) {
  if (!date) return "—";
  moment.locale("es");
  return moment(date).format("DD [de] MMMM YYYY, hh:mm A");
}

export function formatRelativeDate(date: string | null) {
  if (!date) return "—";
  moment.locale("es-do");
  return capitalize(moment(date).fromNow());
}

export function getIncomeFilterString({ ...filters }: IncomesFilters) {
  if (!filters) return [];
  if (filters.memberID?.length) {
    if (filters.type?.includes(incomeTypeID.tithe)) {
      filters.type = (filters.type || []).filter(
        (type) => type !== incomeTypeID.tithe
      );
    } else {
      filters.memberID = null;
    }
  }
  if (filters.ministryID?.length || filters.eventName?.length) {
    if (filters.type?.includes(incomeTypeID.event)) {
      filters.type = (filters.type || []).filter(
        (type) => type !== incomeTypeID.event
      );
    } else {
      filters.ministryID = null;
      filters.eventName = null;
    }
  }
  const entries = Object.entries(filters).filter(([_, value]) =>
    Boolean(value)
  );
  let typesStr = "";
  const mappedFilters = entries.map(([key, value]) => {
    switch (key) {
      case "eventName":
      case "comment":
        return `${key}.ilike.%${value}%`;
      case "startAmount":
        return `amount.gte.${value}`;
      case "startDate":
        return `date.gte.${value}`;
      case "endDate":
        return `date.lte.${value}`;
      case "endAmount":
        return `amount.lte.${value}`;
      case "type":
      case "memberID":
      case "ministryID":
        if (Array.isArray(value)) {
          typesStr +=
            (typesStr && value.length ? "," : "") +
            value.map((id: number) => `${key}.eq.${id}`).join(",");
        }
        return "";
      default:
        return "";
    }
  });

  if (typesStr) mappedFilters.push(typesStr);

  return mappedFilters;
}

export function getBeneficiaryName(outgoing: TableOutgoing) {
  return outgoing.people?.name ?? "-";
}

export function getCreditorName(income: TableIncome) {
  return capitalize(income.people?.name) ?? "-";
}

export function getOutgoingDescription(outgoing: TableOutgoing) {
  if (outgoing.type === outgoingTypeID.loan)
    return `Préstamo: ${outgoing.incomes ? outgoing.incomes.loanName : outgoing.description
      }`;
  if (outgoing.outgoingTypes)
    return `${outgoing.outgoingTypes.name}${outgoing.description ? `: ${outgoing.description}` : ""
      }`;
  return "";
}

export function getOutgoingFilterString({ ...filters }: OutgoingsFilters) {
  if (!filters) return [];
  const entries = Object.entries(filters).filter(([_, value]) =>
    Boolean(value)
  );
  let typesStr = "";
  const mappedFilters = entries.map(([key, value]) => {
    switch (key) {
      case "description":
      case "checkNumber":
        return `${key}.ilike.%${value}%`;
      case "startAmount":
        return `amount.gte.${value}`;
      case "startDate":
        return `date.gte.${value}`;
      case "endDate":
        return `date.lte.${value}`;
      case "endAmount":
        return `amount.lte.${value}`;
      case "type":
      case "beneficiaryID":
        if (Array.isArray(value)) {
          typesStr +=
            (typesStr && value.length ? "," : "") +
            value.map((id: number) => `${key}.eq.${id}`).join(",");
        }
        return "";
      case "loanID":
        return `loanID.eq.${value}`;
      default:
        return "";
    }
  });

  if (typesStr) mappedFilters.push(typesStr);

  return mappedFilters;
}

export function getLoanFilterString({ ...filters }: LoansFilters) {
  if (!filters) return [];
  const entries = Object.entries(filters).filter(([_, value]) =>
    Boolean(value)
  );
  let typesStr = "";

  const mappedFilters = entries.map(([key, value]) => {
    switch (key) {
      case "loanName":
        return `id.eq.${value}`
      case "description":
        return `${key}.ilike.%${value}%`;
      case "startInitialAmount":
        return `amount.gte.${value}`;
      case "startCurrentAmount":
        return `currentDebt.gte.${value}`;
      case "startPaidAmount":
        return `paidAmount.gte.${value}`;
      case "startDate":
        return `date.gte.${value}`;
      case "endDate":
        return `date.lte.${value}`;
      case "endInitialAmount":
        return `amount.lte.${value}`;
      case "endCurrentAmount":
        return `currentDebt.lte.${value}`;
      case "endPaidAmount":
        return `$paidAmount.lte.${value}`;
      case "memberID":
        if (Array.isArray(value)) {
          typesStr +=
            (typesStr && value.length ? "," : "") +
            value.map((id: number) => `${key}.eq.${id}`).join(",");
        }
        return "";
      default:
        return "";
    }
  });

  if (typesStr) mappedFilters.push(typesStr);

  return mappedFilters;
}

export function getPaymentFilterString({ ...filters }: PaymentsFilters) {
  return [];
}

export function getLAvatar(name:any){
return 'AS'
}


