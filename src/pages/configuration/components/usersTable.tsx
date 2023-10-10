import { useEffect, useMemo, useState } from "react";
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import { BsCheck } from "react-icons/bs";
import { useTable } from "react-table";
import styled from "styled-components";
import NoInfo from "../../../components/noInfo";
import useAppData from "../../../hooks/useAppData";
import { User } from "../../../types/models";
import colsSchema from "../const/columnsUsers";
import RolModal from "./rolModal";
import DeleteUserModal from "./removeUserModal";
import InviteUserModal from "./inviteUserModal";
import { CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CTable, CTableBody, CTableHead } from "@coreui/react";


function UsersTable() {
  const { users, loadUsers } = useAppData();
  const columns = useMemo(() => colsSchema, []);
  const [currentUser, setCurrentUser] = useState<User>();
  const [newValue, setNewValue] = useState("");

  const [activeModal, setActiveModal] = useState<
     "ROLE" | "DELETE" | "INVITE"
  >();

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
        isOpen={activeModal === 'INVITE'}
        onClose={() => setActiveModal(undefined)}
      />
      {currentUser &&
        <DeleteUserModal
          isOpen={activeModal === 'DELETE'}
          onClose={() => setActiveModal(undefined)}
          user={currentUser}
        />
      }

      <RolModal
        isOpen={activeModal === 'ROLE'}
        onClose={() => setActiveModal(undefined)}
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
                                  setActiveModal('DELETE')
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
                                <CDropdown>
                                  <CDropdownToggle className="bg-wh">{cell.value}</CDropdownToggle>
                                  <CDropdownMenu>
                                    <CDropdownItem component='button' onClick={() => {
                                      if (cell.value === "Usuario") {
                                        setNewValue("Administrador");
                                        setCurrentUser(user.original);
                                        setActiveModal('ROLE')
                                      } else {
                                        setNewValue("Usuario");
                                        setCurrentUser(user.original);
                                        setActiveModal('ROLE')
                                      }
                                    }}>
                                      {cell.value} <BsCheck />
                                    </CDropdownItem>
                                    <CDropdownItem component='button' onClick={() => {
                                      if (cell.value === "Usuario") {
                                        setNewValue("Administrador");
                                        setCurrentUser(user.original);
                                        setActiveModal('ROLE')
                                      } else {
                                        setNewValue("Usuario");
                                        setCurrentUser(user.original);
                                        setActiveModal('ROLE')
                                      }
                                    }}>{cell.value === 'Usuario' ? 'Administrador' : 'Usuario'}</CDropdownItem>
                                  </CDropdownMenu>
                                </CDropdown>
                              </div>
                            ) : null}
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
        <div className="add-button" onClick={()=> setActiveModal('INVITE')}>
          {/* Este modal esta mal */}
          <CButton color="secondary" id="new-user">
            Nuevo usuario
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

.bg-wh {
  color: #000000;
  background-color: #ffffff;
  border: 0;
  margin: 0;
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
  background-color: aliceblue;
}
.button {
  padding: 0 15px;
}
#new-user {
  display: flex;
  align-items: center;
  gap: 5px;
}

`;

export default UsersTable;
