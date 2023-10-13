import styled from "styled-components";
import Card from "../../components/card";
import FilterSeccion from "./components/filterSeccion";
import { initialValues } from "./constant";
import { useEffect, useState, useRef } from "react";
import useAppData from "../../hooks/useAppData";
import LineChart from "../../components/charts/lineChart";
import { filterInitialValues } from "../incomes/constants";
import { outgoingsInitialValues } from "../outgoings/constants";
import Table from "../../components/table";
import { useTable } from "react-table";
import {useLoansColumns} from "../loans/const/columns";
import {useOutgoingsColumns} from "../outgoings/const/columns";
import { loansInitialFilterValues } from "../loans/constant";
import BarChart from "../../components/charts/barChart";
import { tablesDatasets } from "../../components/charts/const";
import { useIncomeColumns } from "../incomes/const/columns";

function Reporte() {
  const { incomes, loadIncomes, outgoings, loadOuts, loans, loadLoans } = useAppData();
  const [filters, setFilters] = useState(initialValues);
  const [outgoingFilters, setOutgoingFilters] = useState(outgoingsInitialValues);
  const [loanFilters, setLoanFilters] = useState(loansInitialFilterValues);
  const [incomeFilters, setIncomeFilters] = useState(filterInitialValues);
  const outgoingColumns = useOutgoingsColumns();
  const incomeColumns = useIncomeColumns();
  const loansColumns = useLoansColumns();
  const outgoingTable = useTable({ data: outgoings.data, columns: outgoingColumns })
  const incomeTable = useTable({ data: incomes.data, columns: incomeColumns })
  const loansTable = useTable({ data: loans.data, columns: loansColumns })

  useEffect(() => {
    if (filters.tables?.includes('incomes')) {
      setIncomeFilters({ ...filterInitialValues, startDate: filters.startDate, endDate: filters.endDate })
    }
    if (filters.tables?.includes('outgoings')) {
      setOutgoingFilters({ ...outgoingsInitialValues, startDate: filters.startDate, endDate: filters.endDate })
    }
    if (filters.tables?.includes('loans')) {
      setLoanFilters({ ...loansInitialFilterValues, startDate: filters.startDate, endDate: filters.endDate })
    }
  }, [filters])

  return (
    <Wrapper>
      <FilterSeccion filters={filters} setFilters={setFilters} />

      {filters.tables?.includes('incomes') && (<div className="reporte">
        <Card title="GRAFICA DE INGRESOS">
          <BarChart dataset={[{ ...tablesDatasets.income }]} />
        </Card>
        <Card title="TABLA DE INGRESOS"><Table table={incomeTable} filters={incomeFilters} loadData={loadIncomes} count={incomes.count} /></Card>
      </div>)}

      {filters.tables?.includes('outgoings') && (<div className="reporte">
        <Card title="GRAFICA DE EGRESOS"><BarChart dataset={[{ ...tablesDatasets.outgoing }]} /></Card>
        <Card title="TABLA DE EGRESOS">
          <Table table={outgoingTable} filters={outgoingFilters} loadData={loadOuts} count={outgoings.count} />
        </Card>
      </div>)}

      {filters.tables?.includes('loans') && (<div className="">
        <Card title="TABLA DE PRESTAMOS">
          <Table table={loansTable} filters={loanFilters} loadData={loadLoans} count={loans.count} />
        </Card>
      </div>)}

      {filters.tables?.includes('incomes') && filters.tables?.includes('outgoings') && (
        <Card title="GRAFICA DE RELACION DE INGRESOS Y EGRESOS"><LineChart /></Card>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.section`
display: flex;
flex-direction: column;
gap: 50px;
min-width: 600px;

.reporte {
  display: grid;
  grid-template-columns: 3fr 7fr;
  gap: 20px;
}

@media only screen and (max-width:1450px){  
    .reporte {
      grid-template-columns: 1fr;
    }
  }
`;

export default Reporte;
