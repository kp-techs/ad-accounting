import { FieldProps } from "formik";
import { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useSupabase } from "../hooks/useSupabase";
import Select from "react-select";

type Props = FieldProps<any> & {
	table: string;
	isCreatable?: boolean;
	isLoan?: boolean;
	isMulti?: boolean;
};

type Option = {
	label: string;
	value: number | string;
};
function SelectOptions({ form, field, table, isCreatable = true, isLoan = false, isMulti = false }: Props) {
	const { supabase } = useSupabase();

	const [options, setOptions] = useState<Option[]>([]);
	useEffect(() => {
		fetchOptions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function fetchOptions() {
		const { data } = isLoan
			? await supabase.from(table).select(`*`).gt("currentLoanAmount", 0)
			: await supabase.from(table).select(`*`);

		const mapped = data?.map((item) => ({ label: item.name, value: item.id })) || [];
		setOptions(mapped);
	}

	async function handleCreate(name: string) {
		const { data }: any = await supabase.from(table).insert({ name }).select().single();
		const newValue = { label: data?.name, value: data?.id };
		setOptions((prev) => [...prev, newValue]);
		form.setFieldValue(field.name, newValue?.value);
	}

	return isCreatable && !isMulti ? (
		<CreatableSelect
			isClearable
			onChange={(value) => {
				form.setFieldValue(field.name, value?.value);
			}}
			onCreateOption={handleCreate}
			options={options}
			value={options.find((t) => t.value === field.value)}
		/>
	) : !isCreatable && !isMulti ? (
		<Select
			onChange={(value) => {
				form.setFieldValue(field.name, value?.value);
			}}
			options={options}
			value={options.find((t) => t.value === field.value)}
		/>
	) : (
		<Select
			isMulti
			onChange={(value) => {
				form.setFieldValue(
					field.name,
					value.map(({ value }) => value)
				);
			}}
			value={options.filter((op) => field.value?.includes(op.value))}
			options={options}
			className=""
			placeholder="Seleccionar..."
			classNamePrefix="select"
		/>
	);
}

export default SelectOptions;
