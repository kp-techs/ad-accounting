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
	const momentDate = moment(date);
	const daysPassed = moment().diff(moment(date, "YYYYMMDD"), "days");
	const yearsPassed = moment().diff(moment(date, "YYYYMMDD"), "year");

	if (daysPassed < 7) {
		const newDate = momentDate.fromNow();
		return newDate.charAt(0).toUpperCase() + newDate.slice(1);
	} else if (yearsPassed === 0) {
		return momentDate.format("D [de] MMMM");
	} else {
		return momentDate.format("DD/MM/YY");
	}
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
