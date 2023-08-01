import styled from "styled-components";
import useToggle from "../../../hooks/useToggle";
import { useEffect, useState } from "react";
import useAppData from "../../../hooks/useAppData";
import { TableOutgoing } from "../../../types/models";
import OutsModal from "./outsModal";
import NoInfo from "../../../components/noInfo";
import { MdDelete } from "react-icons/md";
import useColumns from "../const/columns";
import { useTable } from "react-table";
import { ImPencil } from "react-icons/im";
import DeleteModal from "./deleteModal";
import DetailsModal from "./detailsModal";

function Table() {
	const { outgoings, loadOuts, profile } = useAppData();

  const [isOutModalOpen, toggleOutsModal] = useToggle();
  const [isDeleteModalOpen, toggleDeleteModal] = useToggle();
  const [isDetailsModalOpen, toggleDetailsModal] = useToggle();

	const [currentPage, setCurrentPage] = useState(1);
	const [activeOuts, setActiveOuts] = useState<TableOutgoing>();
  const pageSize = 15;
  
  const columns = useColumns();
  const table = useTable<TableOutgoing>({columns, data:outgoings.data})
  const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } =
  table;
  useEffect(() => {
		loadOuts(currentPage, pageSize);
		// TODO: incluir FILTERS
	}, [currentPage]);

	return (
		<Wrapper>
      <OutsModal isOpen={isOutModalOpen} onClose={toggleOutsModal} outgoing={activeOuts} />
      <DeleteModal isOpen={isDeleteModalOpen} onClose={toggleDeleteModal} outgoing={activeOuts} />
      <DetailsModal isOpen={isDetailsModalOpen} onClose={toggleDetailsModal} outgoing={activeOuts} />
      
      {outgoings.count ? (
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
              {rows.map((outgoing) => {
                prepareRow(outgoing);

                return (
                  <div className="row-body">
                    <tr
                      {...outgoing.getRowProps()}
                      className="row"
                      onClick={() => {
                        setActiveOuts(outgoing.original);
                        toggleDetailsModal();
                      }}
                    >
                      {outgoing.cells.map((cell) => (
                        
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      ))}

                      {profile?.role === "Administrador" && (
                        <div id="modifyButtons-container">
                          <div
                            className="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveOuts(outgoing.original);
                              toggleOutsModal();
                            }}
                          >
                            <ImPencil size={17} />
                          </div>
                          <div
                            className="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveOuts(outgoing.original);
                              toggleDeleteModal();
                            }}
                          >
                            <div className="button">
                              <MdDelete size={22} />
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
        </div>):(<NoInfo/>)}
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
      grid-template-columns:  repeat(3,1fr) 2fr;
      align-items: center;
      th {
        font-style: italic;
        font-size: 18px;
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
      grid-template-columns: repeat(3,1fr) 2fr;
      align-items: center;
      height: 100%;
      td {
        font-size: 14px;
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
