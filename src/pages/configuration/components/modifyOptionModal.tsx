import Modal from "react-modal";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { useSupabase } from "../../../hooks/useSupabase";
import { customStyles } from "../../../utils/constants";
import { Options } from "../../../types/models";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	option: Options;
	tableName: string;
	onSucess: () => void;
};

const ModifyOptionModal: FC<Props> = ({
	isOpen,
	onClose,
	option,
	tableName,
	onSucess
}) => {
	const { supabase } = useSupabase();
	const [newValue, setNewValue] = useState("");
	const [error, setError] = useState(false);

	async function updateOption() {
		await supabase
			.from(tableName)
			.update({ name: newValue })
			.eq("id", option.id);
		onSucess();
		onClose();
	}

	return (
		<Modal
			ariaHideApp={false}
			isOpen={isOpen}
			onRequestClose={onClose}
			style={customStyles}
			contentLabel="Formulario para modificar opciones"
		>
			<Wrapper>
				<h3>¿Desea modificar "{option.name}"?</h3>
				<p>
					Al modificar este registro, se modicará en todo registro en el que se
					este utilizando. Si está seguro de proceder, introduzca el nuevo
					valor:
				</p>
				<form onSubmit={(e) => e.preventDefault()}>
					<input
						type="text"
						onChange={(e) => {
							setError(false);
							setNewValue(e.target.value);
						}}
					/>
					{error && <label>Debe especificar un nuevo valor</label>}
					<div className="buttons-container">
						<button className="cancel" onClick={onClose}>
							Cancelar
						</button>
						<button
							onClick={() => {
								if (newValue) {
									updateOption();
								} else {
									setError(true);
								}
							}}
						>
							Confirmar
						</button>
					</div>
				</form>
			</Wrapper>
		</Modal>
	);
};

const Wrapper = styled.div`
	width: 450px;
	margin: 10px;

	h3 {
		text-align: center;
		margin: 5px;
	}
	p {
		margin: 0;
		text-align: justify;
		margin-bottom: 20px;
		font-size: 14px;
	}
	label {
		display: block;
		color: #f83232d2;
		font-size: 13px;
	}
	input {
		font-family: Poppins, Arial, Helvetica, sans-serif;
		font-size: 14px;
		width: 100%;
		background-color: hsl(0, 0%, 100%);
		border-radius: 4px;
		border: 1px;
		border-color: hsl(0, 0%, 80%);
		border-style: solid;
		outline: 0;
		padding: 2px 8px;
		box-sizing: border-box;
		color: #2f2f2f;
	}
	.buttons-container {
		margin-top: 20px;
		display: flex;
		justify-content: right;
		grid-area: right;
		gap: 15px;

		.cancel {
			background-color: #273b6c;
			color: #ffffff;
			&:active {
				color: #000000;
			}
		}
		button {
			width: 93px;
			height: 30px;
			text-align: center;
			justify-content: center;
			font-size: 14px;
			box-sizing: border-box;
			background-color: #eeeeee;
			border-radius: 5px;
			font-family: Poppins, Arial, Helvetica, sans-serif;
			border: 0;
			cursor: pointer;
			&:active {
				background-color: #f5f5f5ad;
			}
		}
	}
`;
export default ModifyOptionModal;
