import Modal from "react-modal";
import React, { FC, useState } from "react";
import styled from "styled-components";
import { useSupabase } from "../../../hooks/useSupabase";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";
import { Option } from "../../../types/models";

type Props = {
	isOpen: boolean;
	onClose: () => void;
	option: Option;
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
		<CModal visible={isOpen} onClose={onClose}>
      <Wrapper>
        <CModalHeader>
          <CModalTitle>
				¿Desea modificar {option.name}?
          </CModalTitle>
        </CModalHeader>
        <CModalBody>
			<section className="container">
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
					<CModalFooter>

					<div className="buttons-container">
						<CButton size="sm" color="warning" className="cancel" onClick={onClose}>
							Cancelar
						</CButton>
						<CButton size="sm" color="secondary"
							onClick={() => {
								if (newValue) {
									updateOption();
								} else {
									setError(true);
								}
							}}
							>
							Confirmar
						</CButton>
					</div>
							</CModalFooter>
				</form>
				</section>
			</CModalBody>
			</Wrapper>
		</CModal>
	);
};

const Wrapper = styled.div`
	max-width: 450px;
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
		margin-bottom: 5px;
	}
	.container {
		box-sizing: border-box;
		padding: 1px;
	}

	.buttons-container {
		padding-top: 10px;
    display: flex;
    height: 40px;
    justify-content: end;
  }

  .cancel {
    margin-right: 8px;
  }

  @media only screen and (max-width:700px){  
    h3 {
      font-size: 14px;
    }

    p {
      font-size: 13px;
    }

    button {
      font-size: 13px;
    }
  }

`;
export default ModifyOptionModal;
