import styled from "styled-components";
import { useTable } from "react-table";
import useColumns from "../const/columns";
import { useEffect, useState } from "react";
import { Income } from "../../../types/models";
import useAppData from "../../../hooks/useAppData";

function Table() {
  const { incomes, loadIncomes } = useAppData();
  const [isAdmin] = useState(true);

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
              <tr {...income.getRowProps()} className="row">
                {income.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                {isAdmin && (
                  <div id="modifyButtons-container">
                    <div className="buttons">
                      <img
                        src="assets/images/pencil-161946_640.webp"
                        alt="Modify"
                      />
                    </div>
                    <div className="buttons">
                      <img
                        src="assets/images/delete_318-901546.avif"
                        alt="Delete"
                      />
                    </div>
                  </div>
                )}
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
  tr {
    position: relative;

    &:hover {
      #modifyButtons-container {
        display: flex;
      }
    }
  }

  #modifyButtons-container {
    display: none;
    justify-content: center;
    gap: 15px;
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 50;
  }

  .buttons {
    display: flex;
    padding: 5px;
  }
  img {
    cursor: pointer;
    width: 20px;
  }
  .buttons:hover {
    border-radius: 50%;
    background-color: #99a7b46f;
    border: 0.5 #f0f8ffbe solid;
  }
`;

export default Table;
