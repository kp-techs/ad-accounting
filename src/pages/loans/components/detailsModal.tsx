import Modal from "react-modal";
import { FC } from "react";
import styled from "styled-components";
import { FaRegUserCircle } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { capitalize, formatDate, formatLongDate, formatMoney } from "../../../utils/helper";
import { TableLoans } from "../../../types/models";
import { customStyles } from "../constant";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	loan?: TableLoans;
};

const DetailsModal: FC<Props> = ({ isOpen, onClose, loan }) => {
	return (
		<Modal
			ariaHideApp={false}
			isOpen={isOpen}
			onRequestClose={onClose}
			style={customStyles}
			contentLabel="Modal para ver detalles"
		>
			<Wrapper>
				<div className="concept-container">
					<h3>{capitalize(loan?.name||'')}</h3>
        </div>
        
				<section className="side">
					<p className="title">Fecha</p>
					<p>{formatDate(loan?.date || "—")}</p>
        </section>
        
				<section className="side">
					<p className="title">Acreedor</p>
					<p>{capitalize(loan?.people?.name || "")}</p>
        </section>
        
				<section className="side">
					<p className="title">Deuda Inicial</p>
					<p>{formatMoney(loan?.initialLoanAmount||null)}</p>
        </section>
        
				<section className="side">
					<p className="title">Deuda Restante</p>
					<p>{formatMoney(loan?.currentLoanAmount||null)}</p>
        </section>
        
				<section className="side">
					<p className="title">Total Pagado</p>
					<p>{formatMoney(loan?.paidAmount||null)}</p>
				</section>

				<section className="side">
					<p className="title">Creación</p>
					<div className="user-info">
						<FaRegUserCircle size={30} />
						<p>
							{capitalize(loan?.createdBy||'')}. {formatLongDate(loan?.createdAt || null)}
						</p>
					</div>
				</section>
				{loan?.updateAt !== null && (
					<section className="side">
						<p className="title">Última modificación</p>
						<div className="user-info">
							<FaRegUserCircle size={30} />
							<p>
								{capitalize(loan?.updateBy||'')}. {formatLongDate(loan?.updateAt || null)}
							</p>
						</div>
					</section>
				)}

				<button onClick={onClose}>
					<GrClose />
				</button>
			</Wrapper>
		</Modal>
	);
};

const Wrapper = styled.div`
	font-family: Poppins;
	font-size: 14px;
	color: #000000b1;
	padding: 10px;

	display: grid;
	gap: 10px;

	.concept-container {
		border-bottom: 1px solid black;
		padding-bottom: 5px;
		h3 {
			margin: 0;
		}
	}
	.side {
		display: grid;
		grid-template-columns: 150px 1fr;
		gap: 5px;
	}

	.title {
		font-weight: 600;
	}

	.user-info {
		display: flex;
		gap: 5px;
		align-items: center;
	}

	button {
		top: 15px;
		right: 15px;
		position: absolute;
		background-color: transparent;
		border: 0px;
	}
`;
export default DetailsModal;
