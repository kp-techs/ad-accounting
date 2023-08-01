import { supabase, useSupabase } from "./../hooks/useSupabase";
import { incomeTypeID } from "../pages/incomes/constants";
import { TableIncome, TableOutgoing } from "../types/models";
import moment from "moment";
import "moment/locale/es";

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
			minimumFractionDigits: 2
		}).format(amount);
		return `RD$ ${number}`;
	}
}

export function captalize(str: string | null) {
	if (!str) return "";
	return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatTableDate(date: string | null) {
	moment.locale("es-do");
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

export function formatDate(date: string | null) {
	if (date) return moment(date).format("DD [de] MMMM, YYYY");
}

export function formatLongDate(date: string | null) {
	moment.locale("es");
	return moment(date).format("DD [de] MMMM YYYY, hh:mm A");
}

export function formatRelativeDate(date: string | null) {
	moment.locale("es-do");
	return captalize(moment(date).fromNow());
}

export function getIncomeFilterString({ ...filters }: IncomesFilters) {
	if (!filters) return [];
	if (filters.tithingID?.length) {
		if (filters.type?.includes(incomeTypeID.tithe)) {
			filters.type = (filters.type || []).filter((type) => type !== incomeTypeID.tithe);
		} else {
			filters.tithingID = null;
		}
	}
	if (filters.ministryID?.length || filters.eventName?.length) {
		if (filters.type?.includes(incomeTypeID.event)) {
			filters.type = (filters.type || []).filter((type) => type !== incomeTypeID.event);
		} else {
			filters.ministryID = null;
			filters.eventName = null;
		}
	}
	const entries = Object.entries(filters).filter(([_, value]) => Boolean(value));
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
				return `date.lt.${value}`;
			case "endAmount":
				return `amount.lt.${value}`;
			case "type":
			case "tithingID":
			case "ministryID":
				if (Array.isArray(value)) {
					typesStr +=
						(typesStr && value.length ? "," : "") + value.map((id: number) => `${key}.eq.${id}`).join(",");
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
	return outgoing.beneficiaries?.name ?? "-";
}

export function getOutgoingDescription(outgoing: TableOutgoing) {
	if (outgoing.outgoingTypes)
		return `${outgoing.outgoingTypes.name}${outgoing.description ? `: ${outgoing.description}` : ""}`;
	return "-";
}

export function getOutgoingFilterString({ ...filters }: OutgoingsFilters) {	
	if (!filters) return [];
	const entries = Object.entries(filters).filter(([_, value]) => Boolean(value));
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
				return `date.lt.${value}`;
			case "endAmount":
				return `amount.lt.${value}`;
			case "type":
			case "beneficiaryID":
				if (Array.isArray(value)) {
					typesStr +=
						(typesStr && value.length ? "," : "") + value.map((id: number) => `${key}.eq.${id}`).join(",");
				}
				return "";
			default:
				return "";
		}
	});

	if (typesStr) mappedFilters.push(typesStr);

	return mappedFilters;
}
