import styled from "styled-components";
import { useTable } from "react-table";
import useColumns from "../const/columns";
import { useEffect, useState } from "react";
import useAppData from "../../../hooks/useAppData";
import DeleteModal from "./deletemodal";
import { Income } from "../../../types/models";
import IncomesModal from "./incomeModal";

function Table() {
  const { incomes, loadIncomes } = useAppData();
  const [isAdmin] = useState(true);

  const [activeIncome, setActiveIncome] = useState<Income | undefined>();

  useEffect(() => {
    loadIncomes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = useColumns();

  const table = useTable<Income>({ columns, data: incomes });
  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
    table;

  const [deleteModalIsOpen, setdeleteModalIsOpen] = useState(false);
  function toggleDeleteModal() {
    setdeleteModalIsOpen(!deleteModalIsOpen);
  }

  const [modifyModalIsOpen, setmodifyModalIsOpen] = useState(false);
  function toggleModifyModal() {
    setmodifyModalIsOpen(!modifyModalIsOpen);
  }

  return (
    <Wrapper>
      <DeleteModal
        isOpen={deleteModalIsOpen}
        onClose={toggleDeleteModal}
        income={activeIncome}
      />
      <IncomesModal
        isOpen={modifyModalIsOpen}
        onClose={toggleModifyModal}
        income={activeIncome}
      />
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
                {income.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
                {isAdmin && (
                  <div id="modifyButtons-container">
                    <div
                      className="buttons"
                      onClick={() => {
                        setActiveIncome(income.original);
                        toggleModifyModal();
                      }}
                    >
                      <img
                        src="assets/images/pencil-161946_640.webp"
                        alt="Modify"
                      />
                    </div>
                    <div
                      className="buttons"
                      onClick={() => {
                        setActiveIncome(income.original);
                        toggleDeleteModal();
                      }}
                    >
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
    overflow: scroll;
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
    font-size: 20px;
    border-collapse: separate;
    color: #7a7517;
    text-align: justify;
    border: 0;
  }

  tbody tr:hover {
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
    img {
      cursor: pointer;
      width: 20px;
      /* margin: 2px; */
    }
    box-sizing: border-box;
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
    padding: 3px;
  }

  .buttons:hover {
    border-radius: 50%;
    background-color: #99a7b46f;
    border: 0.5 #f0f8ffbe solid;
  }
`;

export default Table;
