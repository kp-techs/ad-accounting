import { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import { Option } from "../../../types/models";
import colsSchema from "../const/columnsOptions";
import Table from "../../../components/table";
import { useSupabase } from "../../../hooks/useSupabase";
import DeleteModal from "../../../components/deleteModal";
import { AiOutlineDelete } from "react-icons/ai";
import ModifyOptionModal from "./modifyOptionModal";
import { FiEdit } from "react-icons/fi";
import styled from "styled-components";

type Props = {
  name: string;
};

function OptionsTable({ name }: Props) {
  const { supabase } = useSupabase();
  const [data, setData] = useState<any>({});

  const [activeModal, setActiveModal] = useState<"DELETE" | "MODIFY">();
  const [activeOption, setActiveOption] = useState<Option>();

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

  const table = useTable<Option>({ columns, data: data.data || [] });

  const actions = [
    {
      icon: AiOutlineDelete,
      action: (option: Option) => {
        setActiveModal("DELETE");
        setActiveOption(option);
      },
      show: (option: Option) => option.deletable !== false
    },
    {
      icon: FiEdit,
      action: (option: Option) => {
        setActiveModal("MODIFY");
        setActiveOption(option);
      },
      iconSize: 18,
    },
  ];

  return (
    <Wrapper>
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
    </Wrapper>
  );
}

const Wrapper = styled.div`
    table {
    font-family: Poppins;
    thead{
      tr {
        th {
          min-width: 270px;
          font-size: 15px;
        }
      }
    }
  }
`

export default OptionsTable;
