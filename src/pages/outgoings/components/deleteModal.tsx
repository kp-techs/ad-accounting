import Modal from "react-modal";
import { FC } from "react";
import { useSupabase } from "../../../hooks/useSupabase";
import useAppData from "../../../hooks/useAppData";
import styled from "styled-components";
import { outgoingTypeID } from "../constants";
import { Outgoing } from "../../../types/models";
import moment from "moment";
import { customStyles } from "../../../utils/constants";
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  outgoing?: Outgoing;
};

const DeleteModal: FC<Props> = ({ isOpen, onClose, outgoing }) => {
  const { supabase } = useSupabase();
  const { loadOuts, loadLoans, profile } = useAppData();

  async function deleteOutgoing() {
    if (outgoing) {
      if (outgoing.type === outgoingTypeID.loan) {
        const { data: income } = await supabase
          .from("incomes")
          .select()
          .eq("id", outgoing.loanID||0)
          .single();
        let newPaidLoanAmount =
          (income?.paidAmount || 0) - (outgoing.amount || 0);
        let newCurrent = (income?.amount || 0) - newPaidLoanAmount;

        let newStatus = "Pendiente";
        if (newCurrent <= 0) newStatus = "Saldado";

        await supabase
          .from("incomes")
          .update({
            currentDebt: newCurrent,
            paidAmount: newPaidLoanAmount,
            status: newStatus,
            updatedBy: profile?.name,
            updatedDate: moment().format(),
          })
          .eq("id", outgoing.loanID||0);
      }

      await supabase.from("outgoings").delete().eq("id", outgoing.id);
      loadOuts();
      loadLoans();
      onClose();
    }
  }

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
          ¡CUIDADO!
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        <h5>¿Seguro que quieres eliminar este registro?</h5>
        <p>
          Este registro se eliminará permanentemente. Esta acción no se puede
          deshacer.
        </p>
        </CModalBody>
        <CModalFooter>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancelar
          </button>
          <button onClick={deleteOutgoing}>Confirmar</button>
        </div>  
        </CModalFooter>
      </Wrapper>
    </CModal>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin: 10px;

  p {
    margin: 0;
    margin-bottom: 20px;
  }

  .buttons-container {
    display: flex;
    height: 40px;
    justify-content: end;
  }
  
`;
export default DeleteModal;
