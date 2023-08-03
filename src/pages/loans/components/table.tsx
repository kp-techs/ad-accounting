import styled from "styled-components";
import useToggle from "../../../hooks/useToggle";
import { useEffect, useState } from "react";
import useAppData from "../../../hooks/useAppData";
import NoInfo from "../../../components/noInfo";
import useColumns from "../const/columns";
import { useTable } from "react-table";
import Pagination from "../../../components/pagination";
import { TableLoans } from "../../../types/models";
import DetailsModal from "./detailsModal";

type Props = {
  filters: LoansFilters;
}

function Table({filters}:Props) {
	const { loans, loadLoans, profile } = useAppData();

	const [currentPage, setCurrentPage] = useState(1);
  const [activeLoan, setActiveLoan] = useState<TableLoans>();
  const [isDetailsModalOpen, toggleDetailsModal] = useToggle();
  const pageSize = 15;
  
  const columns = useColumns();
  const table = useTable<TableLoans>({columns, data:loans.data})
  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
  table;
  useEffect(() => {
		loadLoans(currentPage, pageSize, filters);
	}, [currentPage, filters]);

	return (
    <Wrapper>
      <DetailsModal isOpen={isDetailsModalOpen} onClose={toggleDetailsModal} loan={activeLoan} />
      {loans.count ? (
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
              {rows.map((loan) => {
                prepareRow(loan);

                return (
                  <div className="row-body">
                    <tr
                      {...loan.getRowProps()}
                      className="row"
                      onClick={() => {
                        setActiveLoan(loan.original);
                        toggleDetailsModal();
                      }}
                    >
                      {loan.cells.map((cell) => (
                        
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}

                    </tr>
                  </div>
                );
              })}
            </tbody>
          </table>
        </div>) : (<NoInfo />)}
      
        <div className="pagination-container">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={loans.count}
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
    width: 100%;
    border-spacing: 0 15px;
  }

  thead {
    tr {
      display: grid;
      grid-template-columns: repeat(2, 2fr) 3fr repeat(3, 2fr);
      align-items: center;
      th {
        font-style: italic;
        font-size: 16px;
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
      grid-template-columns:repeat(2, 2fr) 3fr repeat(3, 2fr);
      align-items: center;
      height: 100%;
      td {
        font-size: 14px;
        padding-left: 25px;
      }
    }

    tr:hover {
      background: #2626262b;
    }
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
