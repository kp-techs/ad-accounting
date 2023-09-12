import Modal from "react-modal";
import { FC, useMemo } from "react";
import styled from "styled-components";
import { GrFormClose } from "react-icons/gr";
import { customStyles } from "../../../utils/constants";
import { capitalize, formatLongDate } from "../../../utils/helper";
import { TableIncome } from "../../../types/models";

import OutgoingsTable from "../../outgoings/components/table";
import { outgoingsInitialValues } from "../../outgoings/constants";

type Props = {
  isOpen: boolean;
  income: TableIncome;
  onClose: () => void;
};


const LoanPaymentsModal: FC<Props> = ({ isOpen, income, onClose }) => {
  const filters = useMemo(() => ({ ...outgoingsInitialValues, loanID: income.id }), [income])

  return (
    <Modal
      ariaHideApp={false}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
    >
      <Wrapper>
        <div className="close">
          <button onClick={onClose}>
            <GrFormClose size={22} />
          </button>
        </div>
        <div className="title">
          <label>PAYMENTS</label>
        </div>
        <OutgoingsTable filters={filters} isLoanVersion={true} />
        <section className="creation-data">
          <p>
          Record created by {capitalize(income.createdBy)}. <br />
{formatLongDate(income.createdDate)}
          </p>
          {income.updatedDate && (
            <p>
              Last time updated by {capitalize(income.updatedBy)}.{" "}
              <br />
              {formatLongDate(income.updatedDate)}
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
