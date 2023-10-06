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
import RolModal from "./rolModal";
import DeleteUserModal from "./removeUserModal";
import InviteUserModal from "./inviteUserModal";
import { CButton, CTable, CTableBody, CTableHead } from "@coreui/react";
import { Menu, MenuItem } from "@szhsin/react-menu";

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
          <CTable {...getTableProps()}>
          <CTableHead color="secondary">
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
                  ))}
                </tr>
              ))}

            </CTableHead>
            <CTableBody {...getTableBodyProps()}>
              {rows.map((user) => {
                prepareRow(user);
                return (
                  <tr {...user.getRowProps()}>
                    {user.cells.map((cell) => {
                      if (cell.column.id === 'actions') {
                        return <td>
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
                        </td>
                      }
                      return (
                        <>

                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                            {cell.column.Header === "Rol" ? (
                              <div className="menu-container">
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
                                  <div className=""
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
                              </div>
                            ) : null}
                            { }
                          </td>

                        </>
                      );
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
      <footer>
        <div className="add-button" onClick={toggleInvitationModal}>
          <CButton color="secondary">
            Nuevo usuario <span></span>
            <SlUserFollow />
          </CButton>
        </div>
      </footer>
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
.modifyRol {
  display: inline;
}
.button {
  padding: 0 15px;
}

.menu-container {
  background-color: #ffffff;
  ul {
    li {
      text-decoration: :none;
    }
  }
}
`;

export default UsersTable;
