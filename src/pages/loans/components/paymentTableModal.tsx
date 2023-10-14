import { FC, useMemo, useRef } from "react";
import styled from "styled-components";
import { capitalize, formatLongDate } from "../../../utils/helper";
import { TableIncome } from "../../../types/models";
import OutgoingsTable from "../../outgoings/components/table";
import { outgoingsInitialValues } from "../../outgoings/constants";
import { StyledCard } from "../../../components/styledComponents";
import PrintButton from "../../../components/printButton";
import { IoReturnUpBack } from "react-icons/io5";

type Props = {
  isOpen: boolean;
  income: TableIncome;
  onClose: () => void;
};

const LoanPayments: FC<Props> = ({ isOpen, income, onClose }) => {
  const filters = useMemo(
    () => ({ ...outgoingsInitialValues, loanID: income.id }),
    [income]
  );
  const myRef = useRef<HTMLDivElement | null>(null);

  return (
    <Wrapper>
      <nav className="payments-header">
        <div className="nav-buttons">
          <div className="button nav-button " onClick={onClose}>
            <IoReturnUpBack size={25} /> <span>Atrás</span>
          </div>
          <PrintButton componentRef={myRef} />
        </div>
        <div>
          <h4>Historial de pagos: {income.loanName}</h4>
        </div>
      </nav>
      <div ref={myRef}>
        <OutgoingsTable filters={filters} isLoanVersion={true} />
      </div>

      <section className="creation-data">
        <p>
          Préstamo registrado por {capitalize(income.createdBy)}. <br />
          El {formatLongDate(income.createdDate)}
        </p>
        {income.updatedDate && (
          <p>
            Actualizado por úlima vez por {capitalize(income.updatedBy)}. <br />
            El {formatLongDate(income.updatedDate)}
          </p>
        )}
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
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
    display: flex;
    gap: 25px;
    font-style: italic;
    font-size: 12px;
  }

  display: grid;
  overflow: hidden;

  .payments-header {
    display: grid;
    height: auto;
    gap: 10px;
    .nav-buttons {
      display: flex;
      width: 100%;
      justify-content: space-between;
    }
    margin-bottom: 20px;
  }
  span {
    font-family: "Poppins";
    font-size: 18px;
    text-align: center;
  }

  select {
    width: 500px;
    border-radius: 20px;
    background: #ffffff;
    height: 25px;
    margin-left: 10px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .button {
    display: flex;
    gap: 9px;
    align-items: center;
    &:hover {
      cursor: pointer;
      color: #5a5a5a;
    }
  }
  .nav-button {
    padding: 5px;

    &:active {
      background-color: #ffffff3a;
      border-radius: 5px;
    }
  }

  .table-wrapper {
    overflow: hidden;
  }

  @media only screen and (max-width: 700px) {
    h4 {
      font-size: 16px;
    }
    span {
      font-size: 13px;
    }
  }
`;
export default LoanPayments;
