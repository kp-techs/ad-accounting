import styled from "styled-components";
import Card from "../../components/card";
import NoInfo from "../../components/noInfo";
import FilterSeccion from "./components/filterSeccion";
import { initialValues } from "./constant";
import { useEffect, useState, useRef } from "react";
import useAppData from "../../hooks/useAppData";
import ChartGeneral from "../../components/charts/chart";
import { filterInitialValues} from "../incomes/constants";
import {  outgoingsInitialValues } from "../outgoings/constants";
import Table from "../../components/table";
import { useTable } from "react-table";
import useIncomeColumns from "../incomes/const/columns";
import useOutgoingsColumns from "../outgoings/const/columns";
import useLoansColumns from "../loans/const/columns";
import { loansInitialFilterValues } from "../loans/constant";

function Reporte() {
  const { incomes, loadIncomes, outgoings, loadOuts, loans, loadLoans } = useAppData();
  const [filters, setFilters] = useState(initialValues);
  const [incomeFilters, setIncomeFilters] = useState(filterInitialValues);
  const [outgoingFilters, setOutgoingFilters] = useState(outgoingsInitialValues);
  const [loanFilters, setLoanFilters] = useState(loansInitialFilterValues);
  const incomeColumns = useIncomeColumns();
  const incomeTable = useTable({ data: incomes.data, columns: incomeColumns })
  const outgoingColumns = useOutgoingsColumns();
  const outgoingTable = useTable({ data: outgoings.data, columns: outgoingColumns })
  const loansColumns = useLoansColumns();
  const loansTable = useTable({ data: loans.data, columns: loansColumns })

  useEffect(() => {
    if (filters.tables?.includes('incomes')) {
      setIncomeFilters({...filterInitialValues, startDate:filters.startDate, endDate:filters.endDate})
    }
    if (filters.tables?.includes('outgoings')) {
      setOutgoingFilters({...outgoingsInitialValues,startDate:filters.startDate, endDate:filters.endDate})
    }
    if (filters.tables?.includes('loans')) {
      setLoanFilters({...loansInitialFilterValues,startDate:filters.startDate, endDate:filters.endDate})
    }
  }, [filters])

  return (
    <Wrapper>
      <FilterSeccion filters={filters} setFilters={setFilters} />
      {filters.tables?.includes('incomes') && (<div className="reporte">
        <Card title="GRAFICA DE INGRESOS">
          <NoInfo />
        </Card>
        <Card title="TABLA DE INGRESOS"><Table table={incomeTable} filters={incomeFilters} loadData={loadIncomes} count={incomes.count} /></Card>
      </div>)}

      {filters.tables?.includes('outgoings') && (<div className="reporte">
        <Card title="GRAFICA DE EGRESOS"><NoInfo /></Card>
        <Card title="TABLA DE EGRESOS">
          <Table  table={outgoingTable} filters={outgoingFilters} loadData={loadOuts} count={outgoings.count} />
        </Card>
      </div>)}

      {filters.tables?.includes('loans') && (<div className="reporte">
        <Card title="GRAFICA DE PRESTAMOS"><NoInfo /></Card>
        <Card title="TABLA DE PRESTAMOS">
          <Table table={loansTable} filters={loanFilters} loadData={loadLoans} count={loans.count} />
        </Card>
      </div>)}

      {filters.tables?.includes('incomes') && filters.tables?.includes('outgoings') && (
        <Card title="GRAFICA DE RELACION DE INGRESOS Y EGRESOS"><ChartGeneral /></Card>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
gap: 50px;

.reporte {
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 20px;
}
`;

export default Reporte;
