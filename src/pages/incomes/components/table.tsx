import styled from "styled-components";
import { useTable } from "react-table";
import useColumns from "../const/columns";
import { useEffect } from "react";
import { Income } from "../../../types/models";
import useAppData from "../../../hooks/useAppData";

function Table() {
  const { incomes, loadIncomes } = useAppData();

  useEffect(() => {
    loadIncomes();
  }, [loadIncomes]);

  const columns = useColumns();

  const table = useTable<Income>({ columns, data: incomes });

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
