import Modal from "react-modal";
import React, { FC } from "react";
import { Income } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import useAppData from "../../../hooks/useAppData";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  income?: Income;
};

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

const DeleteModal: FC<Props> = ({ isOpen, onClose, income }) => {
  const { supabase } = useSupabase();
  const { loadIncomes } = useAppData();

  async function deleteIncome() {
    if (income) {
      await supabase.from("incomes").delete().eq("id", income.id);
      onClose();
      loadIncomes();
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Formulario para registrar ingresos"
    >
      <h2>¿Seguro que desea eliminar este registro?</h2>
      <div>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={deleteIncome}>Confirmar</button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
