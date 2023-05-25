import styled from "styled-components";
import { useTable } from "react-table";
// import useRows from "../utils/rows";
import useColumns from "../const/columns";
import { useEffect, useState } from "react";
import { Income } from "../../../types/models";
import { useSupabase } from "../../../hooks/useSupabase";

function Table() {
  const [incomesRow, setIncomes] = useState<Income[]>([]);
  const { supabase } = useSupabase();

  useEffect(() => {
    fetchIncomes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchIncomes() {
    const { data } = await supabase.from("incomes").select();
    setIncomes(data || []);
  }

  // const data = useRows();
  const columns = useColumns();

  const table = useTable<Income>({ columns, data: incomesRow });

  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
    table;

  return (
    <Wrapper>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((income) => {
            prepareRow(income);
            return (
              <tr {...income.getRowProps()}>
                {income.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
  }
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  thead tr th {
    //css para columnas
    font-size: 20px;
    border-collapse: separate;
    color: #7a7517;
    text-align: justify;
    border: 0;
  }

  tbody tr:hover {
    //css para filas
    background-color: #ddd;
  }
`;
export default Table;
