import { FieldProps } from "formik";
import React, { useEffect, useState } from "react";
import CreatableSelect from "react-select/creatable";
import { useSupabase } from "../../../hooks/useSupabase";

type Props = FieldProps<any> & {
  table: string;
};
type Option = {
  label: string;
  value: number | string;
};
function SelectOptions({ form, field, table }: Props) {
  const { supabase } = useSupabase();

  const [options, setOptions] = useState<Option[]>([]);
  useEffect(() => {
    fetchOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchOptions() {
    const { data } = await supabase.from(table).select(`*`);
    const mapped =
      data?.map((item) => ({ label: item.name, value: item.id })) || [];
    setOptions(mapped);
  }

  async function handleCreate(name: string) {
    const { data }: any = await supabase
      .from(table)
      .insert({ name })
      .select()
      .single();
    console.dir(data);
    const newValue = { label: data?.name, value: data?.id };
    setOptions((prev) => [...prev, newValue]);
    form.setFieldValue(field.name, newValue?.value);
  }

  return (
    <CreatableSelect
      isClearable
      onChange={(value) => {
        form.setFieldValue(field.name, value?.value);
      }}
      onCreateOption={handleCreate}
      options={options}
      value={options.find((t) => t.value === field.value)}
    />
  );
}

export default SelectOptions;
