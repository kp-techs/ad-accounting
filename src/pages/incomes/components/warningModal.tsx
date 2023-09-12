import Modal from "react-modal";
import { FC } from "react";
import { Income } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import styled from "styled-components";
import { customStyles } from "../../../utils/constants";
import { incomeTypeID } from "../constants";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  income: Income;
  values: any;
};

const WarningModal: FC<Props> = ({ isOpen, onClose, income, values, onConfirm }) => {
  const { supabase } = useSupabase();

  async function handleSubmit() {
    await supabase.from('incomes').delete().eq('id', income.id);

    if (values.type !== incomeTypeID.tithe) values.memberID = null;

    await supabase.from('incomes').insert({ ...values, currentDebt: 0, paidAmount: 0, status: '', loanName: '' })

    onClose();
    onConfirm();
  }
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <Wrapper>
        <h3>WARNING!</h3>
        <p>
          There are payments associated with the <span>"{income.loanName}"</span>, 
          <br /> if you change the type of income, all payments related
          <br /> to this loan will be definitively eliminated.
          <br />
          Are you sure you want to continue? </p>
        <div className="buttons-container">
          <button className="cancel" onClick={onClose}>
            Cancel
          </button>
          <button className="submit" onClick={handleSubmit}>
            Confirme
          </button>
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
    font-family: Poppins, Arial, Helvetica, sans-serif;
    
  }
  p {
    font-size:15px;
    margin: 0;
    margin-bottom: 20px;
    font-family: Poppins, Arial, Helvetica, sans-serif;
  }
  span {
    font-style:italic;
    font-family: Poppins, Arial, Helvetica, sans-serif;
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
export default WarningModal;
