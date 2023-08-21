import Modal from "react-modal";
import { FC } from "react";
import OutgoingsTable from "../../outgoings/components/table.old";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { customStyles } from "../../../utils/constants";
import { TableLoans } from "../../../types/models";
import { capitalize, formatLongDate } from "../../../utils/helper";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  filters: OutgoingsFilters;
  loan: TableLoans;
  loanName?: string;
};

const LoanPaymentsModal: FC<Props> = ({
  isOpen,
  onClose,
  filters,
  loanName,
  loan,
}) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Formulario para registrar ingresos"
    >
      <Wrapper>
        <div className="close">
          <button onClick={onClose}>
            <GrFormClose size={22} />
          </button>
        </div>
        <div className="title">
          <label>HISTORIAL DE PAGOS</label>
        </div>
        <OutgoingsTable
          filters={filters}
          isLoanVersion={true}
          loanName={loanName}
        />
        <section className="creation-data">
          <p>
            Registro creado por {capitalize(loan.createdBy)}. <br />
            El {formatLongDate(loan.createdAt)}
          </p>
          {loan.updateAt && (
            <p>
              Actualizado por úlima vez por {capitalize(loan.updateBy)}. <br />
              El {formatLongDate(loan.updateAt)}
            </p>
          )}
        </section>
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  text-align: center;
  margin: 10px;
  width: auto;
  .title {
    display: flex;
    padding-left: 15px;
  }

  label {
    color: #ffffff;
    font-family: Poppins;
    font-weight: 400;
    font-size: 18px;
  }

  p {
    margin: 0;
    margin-bottom: 20px;
    text-align: left;
  }

  .close {
    display: flex;
    justify-content: flex-end;
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
    button {
      background-color: transparent;
      border: 0px;
      align-self: flex-end;
      cursor: pointer;
    }
  }
  .creation-data {
    font-style: italic;
    font-size: 12px;
  }
`;
export default LoanPaymentsModal;
