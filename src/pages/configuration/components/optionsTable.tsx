import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { Options } from "../../../types/models";
import colsSchema from "../const/columnsOptions";
import Table from "../../../components/table";
import { useSupabase } from "../../../hooks/useSupabase";
import DeleteModal from "../../../components/deleteModal";
import { AiOutlineDelete } from "react-icons/ai";
import ModifyOptionModal from "./modifyOptionModal";
import { FiEdit } from "react-icons/fi";

type Props = {
  name: string;
};

function OptionsTable({ name }: Props) {
  const { supabase } = useSupabase();
  const [data, setData] = useState<any>({});

  const [activeModal, setActiveModal] = useState<"DELETE" | "MODIFY">();
  const [activeOption, setActiveOption] = useState<Options>();

  const closeModal = () => {
    setActiveModal(undefined);
    setActiveOption(undefined);
  };

  async function fetchOptions(name: string) {
    const { data, count } = await supabase
      .from(name)
      .select("*", { count: "exact" });
    return { data, count };
  }

  async function loadOptions() {
    const data = await fetchOptions(name);
    setData(data);
  }

  const columns = useMemo(() => colsSchema, []);

  useEffect(() => {
    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  const table = useTable<Options>({ columns, data: data.data || [] });

  const actions = [
    {
      icon: AiOutlineDelete,
      action: (option: Options) => {
        setActiveModal("DELETE");
        setActiveOption(option);
      },
    },
    {
      icon: FiEdit,
      action: (option: Options) => {
        setActiveModal("MODIFY");
        setActiveOption(option);
      },
      iconSize: 18,
    },
  ];

  return (
    <>
      {activeOption && (
        <>
          <DeleteModal
            isOpen={activeModal === "DELETE"}
            onClose={closeModal}
            id={activeOption.id}
            tableName={name}
            onSucess={loadOptions}
          />
          <ModifyOptionModal
            isOpen={activeModal === "MODIFY"}
            onClose={closeModal}
            tableName={name}
            option={activeOption}
            onSucess={loadOptions}
          />
        </>
      )}

      <Table
        table={table}
        loadData={loadOptions}
        count={data.count}
        actions={actions}
      />
    </>
  );
}

export default OptionsTable;