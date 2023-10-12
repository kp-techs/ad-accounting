import { useState } from "react";
import { useTable } from "react-table";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";

import useAppData from "../../../hooks/useAppData";
import { TableOutgoing } from "../../../types/models";
import useOutgoingsColumns from "../const/columns";
import DeleteModal from "../../../components/deleteModal";
import DetailsModal from "./detailsModal";
import Table from "../../../components/table";
import OutsModal from "./outsModal";

type Props = {
  filters: OutgoingsFilters;
  isLoanVersion?: boolean;
};

function OutgoingsTable({ filters, isLoanVersion = false }: Props) {
  const { outgoings, loadOuts } = useAppData();
  const columns = useOutgoingsColumns();

  const table = useTable({ data: outgoings.data, columns });

  const [activeOutgoing, setActiveOutgoing] = useState<TableOutgoing>();
  const [activeModal, setActiveModal] = useState<"SEE" | "EDIT" | "DELETE">();

  const actions = [
    {
      icon: BsEye,
      action: (outgoing: TableOutgoing) => {
        setActiveModal("SEE");
        setActiveOutgoing(outgoing);
      },
      iconSize: 19,
    },
    {
      icon: FiEdit,
      action: (outgoing: TableOutgoing) => {
        setActiveModal("EDIT");
        setActiveOutgoing(outgoing);
      },
      iconSize: 18,
    },
    {
      icon: AiOutlineDelete,
      action: (outgoing: TableOutgoing) => {
        setActiveModal("DELETE");
        setActiveOutgoing(outgoing);
      },
    },
  ];

  const closeModal = () => {
    setActiveModal(undefined);
    setActiveOutgoing(undefined);
  };

  return (
    <>
      <OutsModal
        isOpen={activeModal === "EDIT"}
        onClose={closeModal}
        outgoing={activeOutgoing}
        income={activeOutgoing?.incomes}
        isLoanVersion={isLoanVersion}
      />

      <DetailsModal
        isOpen={activeModal === "SEE"}
        onClose={closeModal}
        outgoing={activeOutgoing}
      />

      {activeOutgoing && (
        <DeleteModal
          isOpen={activeModal === "DELETE"}
          onClose={closeModal}
          id={activeOutgoing.id}
          tableName={"outgoings"}
          onSucess={() => loadOuts(1, 15, filters)}
        />
      )}

      <Table
        table={table}
        filters={filters}
        loadData={loadOuts}
        count={outgoings.count}
        actions={actions}
      />
    </>
  );
}

export default OutgoingsTable;
