import Modal from "react-modal";
import { FC } from "react";
import { Income } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";
import styled from "styled-components";
import { customStyles } from "../../../utils/constants";
import { incomeTypeID } from "../constants";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

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
    <CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
          ¡CUIDADO!
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
        <p>
          Hay pagos asociados al préstamo <span>"{income.loanName}"</span>, al
          <br /> cambiar el tipo de ingreso, se borrará definitivamente
          <br /> todo pago relacionado con este préstamo.
          <br />
          ¿Está seguro de que desea continuar?
        </p>
        </CModalBody>
        <CModalFooter>
        <div className="buttons-container">
          <CButton color='warning' size="sm" className="cancel" onClick={onClose}>
            Cancelar
          </CButton>
          <CButton color='secondary' size='sm' className="submit" onClick={handleSubmit}>
            Confirmar
          </CButton>
        </div>
        </CModalFooter>
      </Wrapper>
    </CModal>
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
    height: 40px;
    justify-content: end;
  }
`;
export default WarningModal;
