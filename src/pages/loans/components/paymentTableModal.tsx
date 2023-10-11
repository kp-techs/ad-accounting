import Modal from "react-modal";
import { FC, useMemo } from "react";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { customStyles } from "../../../utils/constants";
import { capitalize, formatLongDate } from "../../../utils/helper";
import { TableIncome } from "../../../types/models";

import OutgoingsTable from "../../outgoings/components/table";
import { outgoingsInitialValues } from "../../outgoings/constants";
import { CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

type Props = {
  isOpen: boolean;
  income: TableIncome;
  onClose: () => void;
};


const LoanPaymentsModal: FC<Props> = ({ isOpen, income, onClose }) => {
  const filters = useMemo(() => ({ ...outgoingsInitialValues, loanID: income.id }), [income])

  return (
    <CModal size="xl" visible={isOpen} onClose={onClose}>
      <Wrapper>
      <CModalHeader>
        <CModalTitle>
          HISTORIAL DE PAGOS
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <OutgoingsTable filters={filters} isLoanVersion={true} />
      </CModalBody>
      <CModalFooter>
        <section className="creation-data">
          <p>
            Registro creado por {capitalize(income.createdBy)}. <br />
            El {formatLongDate(income.createdDate)}
          </p>
          {income.updatedDate && (
            <p>
              Actualizado por úlima vez por {capitalize(income.updatedBy)}.{" "}
              <br />
              El {formatLongDate(income.updatedDate)}
            </p>
          )}
        </section>
      </CModalFooter>
      </Wrapper>
    </CModal>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin: 10px;

  label {
    color: #000000;
    font-family: Poppins;
    font-weight: 400;
    font-size: 18px;
  }

  p {
    margin: 0;
    margin-bottom: 20px;
    text-align: left;
  }

  
  .creation-data {
    font-style: italic;
    font-size: 12px;
  }
`;
export default LoanPaymentsModal;
