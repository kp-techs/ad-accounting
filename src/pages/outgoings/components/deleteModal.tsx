import Modal from "react-modal";
import { FC } from "react";
import { useSupabase } from "../../../hooks/useSupabase";
import useAppData from "../../../hooks/useAppData";
import styled from "styled-components";
import { outgoingTypeID } from "../constants";
import { Outgoing } from "../../../types/models";
import moment from "moment";
import { customStyles } from "../../../utils/constants";

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
          .eq("id", outgoing.loanID)
          .single();
        let newPaidLoanAmount =
          (income?.paidAmount || 0) - (outgoing.amount || 0);
        let newCurrent = (income?.amount || 0) - newPaidLoanAmount;

        let newStatus = "Outstanding";
        if (newCurrent <= 0) newStatus = "Paid Off";

        await supabase
          .from("incomes")
          .update({
            currentDebt: newCurrent,
            paidAmount: newPaidLoanAmount,
            status: newStatus,
            updatedBy: profile?.name,
            updatedDate: moment().format(),
          })
          .eq("id", outgoing.loanID);
      }

      await supabase.from("outgoings").delete().eq("id", outgoing.id);
      loadOuts();
      loadLoans();
      onClose();
    }
  }

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <Wrapper>
        <h3>Are you sure you want to delete this record?</h3>
        <p>
          This record will be permanently deleted. This action can not be undone.
        </p>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button onClick={deleteOutgoing}>Delete</button>
        </div>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  width: 450px;
  text-align: center;
  margin: 10px;

  h3 {
    margin: 5px;
  }
  p {
    margin: 0;
    margin-bottom: 20px;
  }

  .buttons-container {
    display: flex;
    justify-content: center;
    grid-area: right;
    gap: 15px;

    .cancel {
      background-color: #273b6c;
      color: #ffffff;
      &:active {
        color: #000000;
      }
    }
    button {
      width: 93px;
      height: 30px;
      text-align: center;
      justify-content: center;
      font-size: 14px;
      box-sizing: border-box;
      background-color: #eeeeee;
      border-radius: 5px;
      font-family: Poppins, Arial, Helvetica, sans-serif;
      border: 0;
      cursor: pointer;
      &:active {
        background-color: #f5f5f5ad;
      }
    }
  }
  @media only screen and (max-width:700px){ 
    width: 80vw;

    button {
      font-size: 12px;
      width: 30px;
      height: 10px;
    }

    .fields-container {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;}
  }

  .selectType-container {
    display: grid;
    grid-template-columns: 1fr;
    box-sizing: border-box;
    margin:0;
    padding:0;
  }}
`;
export default DeleteModal;
