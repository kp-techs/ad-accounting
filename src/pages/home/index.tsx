import styled from "styled-components";
import { getTotalAmount } from "../../hooks/useSupabase";
import { useEffect, useState } from "react";
import { formatMoney } from "../../utils/helper";
import useAppData from "../../hooks/useAppData";
import { useNavigate } from "react-router-dom";
import MyStockChart from "../../components/charts/lineChart";

function Home() {
  const { profile } = useAppData();
  const navigate = useNavigate();
  const [incomesAmount, setIncomesAmount] = useState<any>(0);
  const [outgoingsAmount, setOutgoingsAmount] = useState<any>(0);

  const getValues = async () => {
    const totalIncomes = await getTotalAmount('incomes');
    setIncomesAmount(totalIncomes)

    const totalOutgoings = await getTotalAmount('outgoings');
    setOutgoingsAmount(totalOutgoings);
  }

  useEffect(() => {
    getValues()
  },[])
 
  const totalValues = {
    income: formatMoney(incomesAmount),
    outgoing: formatMoney(outgoingsAmount),
    loan: formatMoney(0),
    balance:formatMoney(incomesAmount - outgoingsAmount)
  }
	return (
    <Wrapper>
      <section className="top-container">
        <p>¡Hola, {profile?.name || 'bienvenido devuelta'}!</p>
        <div className="separation-line"/>
      </section>
			<section className="resumen">
				<div className="shortcut" onClick={() => navigate('/incomes')}>
					<p className="title">INGRESOS</p>
          <p>{ totalValues.income}</p>
				</div>
				<div className="shortcut" onClick={() => navigate('/outgoings')}>
					<p className="title">EGRESOS</p>
          <p>{ totalValues.outgoing}</p>
				</div>
				<div>
					<p className="title">PRESTAMOS</p>
          <p>{totalValues.loan}</p>
				</div>
				<div>
					<p className="title">BALANCE</p>
          <p>{totalValues.balance}</p>
				</div>
      </section>
      <section className="chart-container">
        <p>Las gráficas aún no están disponibles.</p>
      </section>
		</Wrapper>
	);
}

const Wrapper = styled.section`
font-family: Poppins;

.top-container {
  p {
    margin: 15px 0 0;
  }
  margin: 0 0 20px;
  padding: 0 10px;
}

.separation-line{
  border-bottom: 1px solid #00000097;
  margin:0;
  padding: 0;
}

.chart-container {
  margin:20px 5px;
  border-radius: 5px;
  box-shadow: 0px 1px 5px 0px #00000024;
  background-color: #ffffff;
  padding: 10px;
  display: flex;
  justify-content: center;
}
	.resumen {
		display: flex;
    justify-content: space-evenly;
		
		div {
			background-color: #ffffffb2;
      padding: 10px 20px;
      width: 20%;
      border-radius: 5px;
      box-shadow: 0px 1px 5px 0px #00000024;

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
    .shortcut {
      cursor: pointer
    }
	}
`;

export default Home;
