import { useEffect, useMemo, useState } from "react";
import { SlUserUnfollow } from "react-icons/sl";
import { LuChevronDown } from "react-icons/lu";
import { useTable } from "react-table";
import styled from "styled-components";
import NoInfo from "../../../components/noInfo";
import useAppData from "../../../hooks/useAppData";
import { User } from "../../../types/models";
import colsSchema from "../const/columns";
import DeleteUserModal from "./DeleteUserModal";
import useToggle from "../../../hooks/useToggle";

function UsersTable() {
	const { users, loadUsers } = useAppData();
	const columns = useMemo(() => colsSchema, []);
	const [isModalOpen, toggleModal] = useToggle();
	const [currentUser, setCurrentUser] = useState<User>();
	useEffect(() => {
		loadUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const table = useTable<User>({ columns, data: users });
	const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } = table;

	return (
		<Wrapper>
			<DeleteUserModal isOpen={isModalOpen} onClose={toggleModal} user={currentUser} />
			{users ? (
				<div className="table-container">
					<table {...getTableProps()}>
						<thead>
							<div className="head-row">
								{headerGroups.map((headerGroup) => (
									<tr {...headerGroup.getHeaderGroupProps()}>
										{headerGroup.headers.map((column) => (
											<th {...column.getHeaderProps()}>{column.render("Header")}</th>
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
													<td {...cell.getCellProps()}>
														{cell.render("Cell")}
														{cell.column.Header === "Rol" ? (
                              <>
                                {/* TO DO: posicionar este simbolo alineado con el texto */}
																<LuChevronDown id="modifyRol" size={20} />
															</>
														) : null}
													</td>
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

			#modifyRol {
				display: inline-flex;
				gap: 10px;
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
	}
`;

export default UsersTable;
