import { useEffect, useState } from "react";
import styled from "styled-components";
import { TableInstance } from "react-table";
import { IconType } from "react-icons";

import NoInfo from "./noInfo";
import Pagination from "./pagination";
import { CTable, CTableBody, CTableHead } from "@coreui/react";

type Props<T extends object, FT extends Filters> = {
  count: number;
  filters?: FT;
  table: TableInstance<T>;
  isLoanVersion?: boolean;
  actions?: TableAction<T>[];
  loadData: (page?: number, size?: number, filters?: FT) => Promise<void>;
};

type TableAction<T> = {
  icon: IconType;
  action: (item: T) => void;
  show?: (item: T) => boolean;
  iconSize?: number;
};

function Table<T extends object, FT extends Filters>({
  filters,
  count,
  table,
  loadData,
  actions,
}: Props<T, FT>) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 15;

  useEffect(() => {
    loadData(currentPage, pageSize, filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
    table;

  return (
    <Wrapper>
      {count ? (
        <div className="table-container">
          <CTable {...getTableProps()}>
            <CTableHead color="secondary">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="cell-title">
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </CTableHead>
            <CTableBody {...getTableBodyProps()}>
              {rows.map((item) => {
                prepareRow(item);

                return (
                  <tr {...item.getRowProps()}>
                    {item.cells.map((cell) => {
                      if (cell.column.id === 'actions' && Boolean(actions?.length)) {
                        return <td>
                          <div
                            id="modify-container"
                            className="modifyButtons-container"
                          >

                            {actions?.filter(action => action.show ? action.show(item.original) : true)?.map(({ action, icon: Icon, iconSize }) => (
                              <div
                                className="button"
                                onClick={() => action(item.original)}
                              >
                                <Icon size={iconSize || 20} />
                              </div>
                            ))}
                          </div>
                        </td>
                      }
                      return <td {...cell.getCellProps()} className="cell-table">
                        {cell.render("Cell")}
                      </td>
                    })}
                  </tr>
                );
              })}
            </CTableBody>
          </CTable>
        </div>
      ) : (
        <div className="no-data">
          <NoInfo />
        </div>
      )}

      <div className="pagination-container">
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={count}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  font-style: Poppins;
  overflow: scroll;

  table {
    font-family: Poppins;
  }

  .modifyButtons-container {
    display: flex;
    height: 100%;
    align-items: center;
    gap: 10px;
  }

  .button {
    padding: 3px;
    cursor: pointer;
  }

  .pagination-container {
    display: flex;
    justify-content: right;
  }
  .no-data {
  height: 550px;
  display: grid;
  place-content: center;
  }

`;

export default Table;
