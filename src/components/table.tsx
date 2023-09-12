import { useEffect, useState } from "react";
import styled from "styled-components";
import { TableInstance } from "react-table";
import { IconType } from "react-icons";

import NoInfo from "./noInfo";
import Pagination from "./pagination";

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
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="cell-title">
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((item) => {
                prepareRow(item);

                return (
                  <tr {...item.getRowProps()} className="row">
                    {item.cells.map((cell) => (
                      <td {...cell.getCellProps()} className="cell-table">
                        {cell.render("Cell")}
                      </td>


                    ))}
                    {Boolean(actions?.length) && (
                      <td>
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
                    )}
                  </tr>
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  gap: 1rem;

  .table-container {
    overflow: auto;

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
      th {
        font-size: 17px;
        color: #000000;
        text-align: justify;
        border: 0;
        font-weight: 300;
        padding-left: 15px;
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
      &::after {
        background-color: white;
        width: 100%;
        height: 1px;
      }

      td {
        font-size: 14px;
        padding: 15px;
        background-color: rgba(33, 80, 119, 0.109);

        &:first-child {
          border-top-left-radius: 20px;
          border-bottom-left-radius: 20px;
        }

        &:last-child {
          border-top-right-radius: 20px;
          border-bottom-right-radius: 20px;
        }
      }

      &:hover {
        background: #2626262b;
      }
    }
  }

  .modifyButtons-container {
    display: flex;
    height: 100%;
    justify-content: flex-end;
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
  .line {
    border-bottom: 1px solid #fff;
  }

  @media only screen and (max-width:700px){

    thead {
      tr {
        th {
          font-size: 14px;
        }
      }
    }

    tbody {
      tr {
td {
  font-size: 12px;
}
      }
    }

  }
`;

export default Table;
