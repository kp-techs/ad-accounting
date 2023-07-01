import styled from "styled-components";
import { useTable } from "react-table";
import useColumns from "../const/columns";
import { useEffect, useState } from "react";
import useAppData from "../../../hooks/useAppData";
import DeleteModal from "./deletemodal";
import { TableIncome } from "../../../types/models";
import IncomesModal from "./incomeModal";
import Pagination from "../../../components/pagination";
import { MdDelete } from "react-icons/md";
import { ImPencil } from "react-icons/im";
import DetailsModal from "./detailsModal";
import useToggle from "../../../hooks/useToggle";
import NoInfo from "../../../components/noInfo";

type Props = {
  filters: Filters;
};

function Table({ filters }: Props) {
  const { incomes, loadIncomes, profile } = useAppData();

  const [currentPage, setCurrentPage] = useState(1);
  const [activeIncome, setActiveIncome] = useState<TableIncome>();

  const pageSize = 15;

  useEffect(() => {
    loadIncomes(currentPage, pageSize, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  const columns = useColumns();

  const table = useTable<TableIncome>({ columns, data: incomes.data });
  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
    table;

  const [isDeleteModalOpen, toggleDeleteModal] = useToggle();
  const [isDetailsModalOpen, toggleDetailsModal] = useToggle();
  const [isModifyModalOpen, toggleModifyModal] = useToggle();

  return (
    <Wrapper>
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={toggleDeleteModal}
        income={activeIncome}
      />
      <IncomesModal
        isOpen={isModifyModalOpen}
        onClose={toggleModifyModal}
        income={activeIncome}
      />
      <DetailsModal
        isOpen={isDetailsModalOpen}
        onClose={toggleDetailsModal}
        income={activeIncome}
      />
      {incomes.count ? (
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
                    <tr
                      {...income.getRowProps()}
                      className="row"
                      onClick={() => {
                        setActiveIncome(income.original);
                        toggleDetailsModal();
                      }}
                    >
                      {income.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}

                      {profile?.role === "Administrador" && (
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
                              <MdDelete size={16} />
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
      ) : (
        <NoInfo />
      )}

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
  font-style: Poppins;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 65px);
  box-sizing: border-box;

  .table-container {
    overflow: auto;
    height: calc(100% - 45px);

    &::-webkit-scrollbar {
      background-color: #ffffff;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #273b6c;
      border-radius: 10px;
    }
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
      grid-template-columns: 1fr 2fr 1fr;
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
      grid-template-columns: 1fr 2fr 1fr;
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

  .noInfo {
    display: grid;
    width: 100%;
    height: 100%;
    place-items: center;
    div {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: Poppins;
      font-size: 16px;
    }
  }
`;

export default Table;
