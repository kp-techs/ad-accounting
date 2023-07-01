import { useEffect, useMemo } from "react";
import { ImPencil } from "react-icons/im";
import { MdDelete } from "react-icons/md";
import { useTable } from "react-table";
import styled from "styled-components";
import NoInfo from "../../../components/noInfo";
import useAppData from "../../../hooks/useAppData";
import { User } from "../../../types/models";
import colsSchema from "../const/columns";

function UsersTable() {
  const { users, loadUsers } = useAppData();
  const columns = useMemo(() => colsSchema, []);

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const table = useTable<User>({ columns, data: users });
  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
    table;

  return (
    <Wrapper>
      {users ? (
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
              {rows.map((user) => {
                prepareRow(user);

                return (
                  <div className="row-body">
                    <tr {...user.getRowProps()} className="row">
                      {user.cells.map((cell) => (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}
                      <div id="modifyButtons-container">
                        <div className="button">
                          <ImPencil size={18} />
                        </div>
                        <div className="button">
                          <div className="button">
                            <MdDelete size={16} />
                          </div>
                        </div>
                      </div>
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
      <div className="pagination-container"></div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 100%;
  width: 100%;
  font-style: Poppins;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
      grid-template-columns: 1fr 2fr 1fr 1.5fr;
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
      grid-template-columns: 1fr 2fr 1fr 1.5fr;
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

export default UsersTable;
