import styled from "styled-components";
import { getTotalAmount } from "../../hooks/useSupabase";
import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/helper";
import { useNavigate } from "react-router-dom";
import {GiPayMoney, GiReceiveMoney} from "react-icons/gi"
import moment from "moment";
import { BsBank } from "react-icons/bs";
import { MdAttachMoney } from "react-icons/md";
import LineChart from "../../components/charts/lineChart";
import Card from "../../components/card";

function Home() {
  const navigate = useNavigate();
  const [incomesAmount, setIncomesAmount] = useState<any>(0);
  const [outgoingsAmount, setOutgoingsAmount] = useState<any>(0);
  const [loansAmount, setLoansAmount] = useState<any>(0);

  const getValues = async () => {
    const thisMonth = moment().startOf('month').format('YYYY-MM-DD')
    const totalIncomes = await getTotalAmount('incomes', 'amount', thisMonth);
    setIncomesAmount(totalIncomes)

    const totalOutgoings = await getTotalAmount('outgoings', 'amount', thisMonth);
    setOutgoingsAmount(totalOutgoings);

    const totalLoans = await getTotalAmount('incomes', 'currentDebt')
    setLoansAmount(totalLoans);
  }

  useEffect(() => {
    getValues()
  }, [])

  const totalValues = {
    income: formatMoney(incomesAmount),
    outgoing: formatMoney(outgoingsAmount),
    loan: formatMoney(loansAmount),
    balance: formatMoney(incomesAmount - outgoingsAmount)
  }

  return (
    <Wrapper>
      <section className="resumen">
        <div className="resumen-item shortcut" onClick={() => navigate('/ingresos')}>
          <div className="resumen-icon"><GiReceiveMoney color="white" size={42}/></div>
          <div className="resumen-detail">
          <p className="title">INGRESOS</p>
          <p>{totalValues.income}</p>
          </div>
        </div>
        <div className="resumen-item shortcut" onClick={() => navigate('/egresos')}>
        <div className="resumen-icon"><GiPayMoney color='white' size={45} /></div>
          <div className="resumen-detail">
        <p className="title">EGRESOS</p>
          <p>{totalValues.outgoing}</p>
        </div>
        </div>
        <div className="resumen-item shortcut" onClick={() => navigate('/prestamos')}>
        <div className="resumen-icon"><BsBank size={37} color="white"/></div> 
          <div className="resumen-detail">
        <p className="title">PRESTAMOS</p>
          <p>{totalValues.loan}</p>
        </div>
        </div>
        <div className="resumen-item">
        <div className="resumen-icon"><MdAttachMoney color="white" size={45}/></div>
          <div className="resumen-detail">
          <p className="title">BALANCE</p>
          <p>{totalValues.balance}</p>
        </div>
        </div>
      </section>
      <Card title=""><LineChart /></Card>
    </Wrapper>
  );
}

const Wrapper = styled.section`
font-family: Poppins;
padding: 0;
display: grid;
gap: 25px;
width: 100%;
overflow: hidden;

	.resumen {
		display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 20px;
    width: 100%;
    height: 100%;
    
		.resumen-item {
      display: grid;
      grid-template-columns: 90px 1fr;
      background-color: #ffffffb2;
      width: 100%;
      border-radius: 5px;
      box-shadow: 0px 1px 5px 0px #00000024;
      gap: 10px;

      .resumen-icon {
        display: grid;
        place-content: center;
        background-color: #063970;
        height: 90px;
        width: 100%;
        padding: 10px;
        border-radius: 5px 0 0 5px;
      }
      .resumen-detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        .title {
          font-size: 12px;
          font-weight: normal;
        }
        p {
          margin: 0;
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
    .shortcut {
      cursor: pointer
    }
	}

  @media screen and (min-width: 1160px) and (max-width: 1605px) {
    .resumen {
      grid-template-columns: repeat(auto-fit, minmax(230px, 1fr));
    }
  }

  @media only screen and (max-width:700px){
    p {
      font-size: 12px;
    }
    .resumen {      
      div {
        .title {
          font-size: 10px;
          font-weight: normal;
        }

        p {
          margin: 0;
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }

`;

export default Home;
