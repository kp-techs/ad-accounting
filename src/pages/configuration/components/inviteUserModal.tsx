import { useSupabase } from "../../../hooks/useSupabase";
import Modal from "react-modal";
import styled from "styled-components";
import { useId, useState } from "react";
import useAppData from "../../../hooks/useAppData";
import { customStyles } from "../../../utils/constants";
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from "@coreui/react";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};
const InviteUserModal = ({ isOpen, onClose }: Props) => {
	const { profile } = useAppData();
	const invitedBy = profile ? profile.name : "Origen";
	const { supabase } = useSupabase();

	const [email, setEmail] = useState("");
	const [role, setRole] = useState("Usuario");
	const [message, setMessage] = useState(`
  Hola, ¡Dios te bendiga!
  Te invitamos a colaborar en el sistema de contabilidad de la Iglesia Casa de Oración.`);

	const handleInvitation = async (event: { preventDefault: () => void }) => {
		event.preventDefault();
		await supabase.auth.admin.inviteUserByEmail(email, {
			redirectTo: "https://ad-accounting.vercel.app/create-new_user",
			data: { role, invitedBy, message }
		});
		onClose();
	};

	return (
		<CModal visible={isOpen} onClose={onClose}>
			<Wrapper>
				<div>
					<form className="form-widget" onSubmit={handleInvitation}>
						<CModalHeader>
							<CModalTitle>
								INVITAR USUARIO
							</CModalTitle>
						</CModalHeader>
						<CModalBody>
						<section className="body-modal">
							<div className="form-field">
								<label htmlFor="email">Correo</label>
								<input
									id="email"
									type="email"
									placeholder="Correo Electronico"
									required={true}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-field">
								<label>Rol</label>
								<select
									onChange={(e) => {
										setRole(e.target.value);
									}}
								>
									<option value="Usuario">Usuario</option>
									<option value="Administrador">Administrador</option>
								</select>
							</div>
							<div className="form-field">
								<label>Mensaje</label>
								<textarea
									placeholder="Personalizar mensaje de invitación"
									onChange={(e) => setMessage(e.target.value)}
								/>
							</div>
						</section>
						</CModalBody>
						<CModalFooter>
							<CButton size='sm' color='secondary'>Cancelar</CButton>
							<CButton size='sm' color='warning' className="send">Enviar</CButton>
						</CModalFooter>
					</form>
				</div>
			</Wrapper>
		</CModal>
	);
};
const Wrapper = styled.div`
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		color: #000000;
		font-family: Poppins, Arial, Helvetica, sans-serif;
	}
	
	input,
	select,
	textarea {
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

	input,
	select {
		height: 30px;
	}

	.form-field {
		margin-bottom: 10px;
	}

	.buttons-container {
    display: flex;
    height: 40px;
    justify-content: end;
  }
  .send {
	padding: 4px 19.06px;
  }

  @media only screen and (max-width:700px){  
    p {
      font-size: 13px;
    }

    button {
      font-size: 13px;
    }
  }
`;
export default InviteUserModal;
