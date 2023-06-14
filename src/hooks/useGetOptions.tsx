import { useEffect, useState } from "react";
import { useSupabase } from "./useSupabase";

type Props = {
  table: string;
};
type Option = {
  label: string;
  value: number | string;
};
function useGetOptions({ table }: Props) {
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

  return options;
}

export default useGetOptions;
