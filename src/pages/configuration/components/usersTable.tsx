import { useEffect, useMemo, useState } from "react";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { BsCheck } from "react-icons/bs";
import { useTable } from "react-table";
import styled from "styled-components";
import NoInfo from "../../../components/noInfo";
import useAppData from "../../../hooks/useAppData";
import { User } from "../../../types/models";
import colsSchema from "../const/columnsUsers";
import useToggle from "../../../hooks/useToggle";
import { Menu, MenuItem } from "@szhsin/react-menu";
import RolModal from "./rolModal";
import DeleteUserModal from "./removeUserModal";
import InviteUserModal from "./inviteUserModal";

function UsersTable() {
  const { users, loadUsers } = useAppData();
  const columns = useMemo(() => colsSchema, []);
  const [isModalOpen, toggleModal] = useToggle();
  const [isInvitationModalOpen, toggleInvitationModal] = useToggle();
  const [isRolModalOpen, toggleRolModal] = useToggle();
  const [currentUser, setCurrentUser] = useState<User>();
  const [newValue, setNewValue] = useState("");

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const table = useTable<User>({ columns, data: users });
  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
    table;

  return (
    <Wrapper>
      <InviteUserModal
        isOpen={isInvitationModalOpen}
        onClose={toggleInvitationModal}
      />
      <DeleteUserModal
        isOpen={isModalOpen}
        onClose={toggleModal}
        user={currentUser}
      />
      <RolModal
        isOpen={isRolModalOpen}
        onClose={toggleRolModal}
        user={currentUser}
        newValue={newValue}
      />
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
                      {user.cells.map((cell) => {
                        return (
                          <div className="cell">
                            <td {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                            {cell.column.Header === "Rol" ? (
                              <Menu
                                menuButton={(props) => {
                                  return (
                                    <div className="modifyRol">
                                      {props.open ? (
                                        <LuChevronUp id="modifyRol" size={20} />
                                      ) : (
                                        <LuChevronDown
                                          id="modifyRol"
                                          size={20}
                                        />
                                      )}
                                    </div>
                                  );
                                }}
                              >
                                <MenuItem className="menu-item">
                                  <div
                                    onClick={() => {
                                      if (cell.value === "Usuario") {
                                        setNewValue("Administrador");
                                        setCurrentUser(user.original);
                                        toggleRolModal();
                                      }
                                    }}
                                  >
                                    Administrador
                                    {cell.value === "Administrador" ? (
                                      <BsCheck />
                                    ) : null}
                                  </div>
                                </MenuItem>
                                <MenuItem
                                  className="menu-item"
                                  onClick={() => {
                                    if (cell.value === "Administrador") {
                                      setNewValue("Usuario");
                                      setCurrentUser(user.original);
                                      toggleRolModal();
                                    }
                                  }}
                                >
                                  <div>
                                    Usuario
                                    {cell.value === "Usuario" ? (
                                      <BsCheck />
                                    ) : null}
                                  </div>
                                </MenuItem>
                              </Menu>
                            ) : null}
                          </div>
                        );
                      })}
                      <div id="modifyButtons-container">
                        <div className="button">
                          <div
                            className="button"
                            onClick={() => {
                              setCurrentUser(user.original);
                              toggleModal();
                            }}
                          >
                            <SlUserUnfollow size={20} />
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
      <footer>
        <div className="add-button" onClick={toggleModal}>
          <button>
            <span>Nuevo usuario</span>
            <SlUserFollow />
          </button>
        </div>
      </footer>
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
    padding: 10px;
    height: 50px;
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

      #modifyRol {
        display: inline-flex;
        gap: 10px;
      }
    }
  }

  #modifyButtons-container {
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    gap: 15px;
    position: absolute;
    top: 0;
    right: 20px;
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

  #modifyRol {
    display: none;
    cursor: pointer;
  }

  .cell {
    display: flex;
  }

  .modifyRol {
    display: flex;
    width: 100%;
    align-items: center;
  }

  footer {
    display: grid;
    padding: 20px;

    .pagination-container {
      display: flex;
      justify-content: end;
      align-content: left;
    }
  }
  .add-button {
    button {
      border: 0;
      display: flex;
      padding: 0px 20px;
      background-color: #273b6c;
      color: #ffffff;
      border-radius: 5px;
      height: 30px;
      align-items: center;
      font-family: Poppins;
      cursor: pointer;
      gap: 10px;
    }
  }
`;

export default UsersTable;
