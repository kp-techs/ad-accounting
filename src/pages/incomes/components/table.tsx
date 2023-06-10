import styled from "styled-components";
import { useTable } from "react-table";
import useColumns from "../const/columns";
import { useEffect, useState } from "react";
import useAppData from "../../../hooks/useAppData";
import DeleteModal from "./deletemodal";
import { Income } from "../../../types/models";
import IncomesModal from "./incomeModal";
import Pagination from "../../../components/pagination";
import { MdDelete } from "react-icons/md";
import { ImPencil } from "react-icons/im";

function Table() {
  const { incomes, loadIncomes } = useAppData();
  const [isAdmin] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;
  const [activeIncome, setActiveIncome] = useState<Income | undefined>();

  useEffect(() => {
    loadIncomes(currentPage, pageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const columns = useColumns();

  const table = useTable<Income>({ columns, data: incomes.data });
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
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            <div className="head-row">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </div>
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((income) => {
              prepareRow(income);

              return (
                <div className="row-body">
                  <tr {...income.getRowProps()} className="row">
                    {income.cells.map((cell) => (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    ))}
                    {isAdmin && (
                      <div id="modifyButtons-container">
                        <div
                          className="button"
                          onClick={() => {
                            setActiveIncome(income.original);
                            toggleModifyModal();
                          }}
                        >
                          <ImPencil size={18} />
                        </div>
                        <div
                          className="button"
                          onClick={() => {
                            setActiveIncome(income.original);
                            toggleDeleteModal();
                          }}
                        >
                          <div className="button">
                            <MdDelete size={24} />
                          </div>
                        </div>
                      </div>
                    )}
                  </tr>
                </div>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-container">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={incomes.count}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  /* font-style: Poppins; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 65px);
  box-sizing: border-box;

  .table-container {
    overflow: scroll;
    height: calc(100% - 45px);
  }
  table {
    font-family: Poppins;
    font-size: 14px;
    width: 100%;
    border-spacing: 0 15px;
  }

  thead {
    tr {
      display: grid;
      grid-template-columns: 300px 1fr 350px;
      align-items: center;
      th {
        font-style: italic;
        font-size: 20px;
        color: #000000;
        text-align: justify;
        border: 0;
        font-weight: 300;
        padding-left: 25px;
      }
    }
  }

  .row-body {
    border: white 1px solid;
    border-width: 1px 0 0 0;
    height: 50px;
    padding: 10px;
  }

  tbody {
    tr {
      border-radius: 20px;
      background-color: rgba(33, 80, 119, 0.109);
      position: relative;
      display: grid;
      grid-template-columns: 300px 1fr 350px;
      align-items: center;
      height: 100%;
      td {
        font-size: 16px;
        padding-left: 25px;
      }
    }

    tr:hover {
      background: #2626262b;
      #modifyButtons-container {
        display: flex;
      }
    }
  }

  #modifyButtons-container {
    height: 100%;
    box-sizing: border-box;
    display: none;
    justify-content: center;
    gap: 15px;
    position: absolute;
    top: 0;
    right: 10px;
    z-index: 50;
  }
  .button {
    display: flex;
    padding: 3px;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .pagination-container {
    display: flex;
    justify-content: right;
  }
`;

export default Table;
