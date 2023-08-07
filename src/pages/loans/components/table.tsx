import styled from "styled-components";
import useToggle from "../../../hooks/useToggle";
import { FC, useEffect, useState } from "react";
import useAppData from "../../../hooks/useAppData";
import NoInfo from "../../../components/noInfo";
import useColumns from "../const/columns";
import { useTable } from "react-table";
import Pagination from "../../../components/pagination";
import { TableLoans } from "../../../types/models";
import DetailsModal from "./detailsModal";
// import ModifyLoanModal from "./modifyModal";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";


type Props = {
	filters: LoansFilters;
};

const Table: FC<Props> = ({ filters }: Props) => {
	const { loans, loadLoans, profile } = useAppData();

	const [currentPage, setCurrentPage] = useState(1);
	const [activeLoan, setActiveLoan] = useState<TableLoans>();
	const [isDetailsModalOpen, toggleDetailsModal] = useToggle();
	const [isModifyLoanOpen, toggleModifyModal] = useToggle();
	const [isDeleteLoanOpen, toggleDeleteModal] = useToggle();
	const pageSize = 15;

	const columns = useColumns();
	const table = useTable<TableLoans>({ columns, data: loans.data });
	const { getTableProps, getTableBodyProps, rows, headerGroups, prepareRow } = table;

	useEffect(() => {
		loadLoans(currentPage, pageSize, filters);
	}, [currentPage, filters]);
	//to do: modal de borrar prestamo o borrar pago.
	//to do: version de modificar prestamo.

	return (
		<Wrapper>
			<DetailsModal isOpen={isDetailsModalOpen} onClose={toggleDetailsModal} loan={activeLoan} />
			{/* <ModifyLoanModal isOpen={ isModifyLoanOpen} onClose={toggleModifyModal} loan={activeLoan} /> */}
			{loans.count ? (
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
							{rows.map((loan) => {
								prepareRow(loan);

								return (
									<div className="row-body">
										<tr {...loan.getRowProps()} className="row">
											{loan.cells.map((cell) => {
												return (
													<div className="cell">
														<td {...cell.getCellProps()}>
															{cell.column.Header === "Acciones" ? (
																<div id="modifyButtons-container">
																	<div
																		className="button"
																		onClick={() => {
																			setActiveLoan(loan.original);
																			toggleDetailsModal();
																		}}
																	>
																		<BsEye size={19} />
																	</div>

																	{profile?.role === "Administrador" && (
																		<>
																			<div
																				className="button"
																				onClick={() => {
																					setActiveLoan(loan.original);
																					toggleModifyModal();
																				}}
																			>
																				<FiEdit size={18} />
																			</div>
																			<div
																				className="button"
																				onClick={() => {
																					setActiveLoan(loan.original);
																					toggleDeleteModal();
																				}}
																			>
																				<AiOutlineDelete size={20} />
																			</div>
																		</>
																	)}
																</div>
															) : (
																cell.render("Cell")
															)}
														</td>
													</div>
												);
											})}
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
					totalCount={loans.count}
					pageSize={pageSize}
					onPageChange={setCurrentPage}
				/>
			</div>
		</Wrapper>
	);
};

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
			grid-template-columns: 1.3fr 2fr 2fr repeat(3, 1.5fr) 1fr 1.5fr;
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
		padding: 10px;
		
		.row {
			box-sizing: border-box;
			.cell {
				box-sizing: border-box;
			}
	}
	}
	

	tbody {
		tr {
			border-radius: 20px;
			padding: 1px;
			box-sizing: border-box;
			background-color: rgba(33, 80, 119, 0.109);
			position: relative;
			display: grid;
			grid-template-columns: 1.3fr 2fr 2fr repeat(3, 1.5fr) 1fr 1.5fr;
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

	#modifyButtons-container {
		display: flex;
		justify-content: center;
		gap: 5px;
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
