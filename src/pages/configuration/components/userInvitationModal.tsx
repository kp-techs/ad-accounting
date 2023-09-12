import { useSupabase } from "../../../hooks/useSupabase";
import Modal from "react-modal";
import styled from "styled-components";
import { useState } from "react";
import useAppData from "../../../hooks/useAppData";

type Props = {
	isOpen: boolean;
	onClose: () => void;
};
const UserInvitationModal = ({ isOpen, onClose }: Props) => {
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
			redirectTo: "https://ad-accounting-delta.vercel.app/create-new_user",
			data: { role, invitedBy, message }
		});
		onClose();
	};

	return (
		<Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose}>
			<Wrapper>
				<div>
					<form className="form-widget" onSubmit={handleInvitation}>
						<div className="head-modal">
							<h3>Invite a new user</h3>
						</div>
						<section className="body-modal">
							<div className="form-field">
								<label htmlFor="email">Email</label>
								<input
									id="email"
									type="email"
									placeholder="email"
									required={true}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
							<div className="form-field">
								<label>Role</label>
								<select
									onChange={(e) => {
										setRole(e.target.value);
									}}
								>
									<option value="User">User</option>
									<option value="Admin">Admin</option>
								</select>
							</div>
							<div className="form-field">
								<label>Message</label>
								<textarea
									placeholder="Customize invitation message"
									onChange={(e) => setMessage(e.target.value)}
								/>
							</div>
						</section>
						<div className="foo-modal">
							<button>Cancel</button>
							<button>Send</button>
						</div>
					</form>
				</div>
			</Wrapper>
		</Modal>
	);
};
const Wrapper = styled.div`
	form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		width: 400px;
		color: #eeeeee;
		font-family: Poppins, Arial, Helvetica, sans-serif;
	}
	.head-modal {
		border-bottom: 1px gray solid;
	}
	h3 {
		color: #eeeeee;
		margin: 0;
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
	.foo-modal {
		display: flex;
		justify-content: right;
		gap: 10px;
	}
	button {
		padding: 0px 10px;
		color: #000;
		border-radius: 20px;
		width: 93px;
		height: 30px;
		text-align: center;
		justify-content: center;
		font-size: 16px;
		box-sizing: border-box;
		background-color: #eeeeee;
		border-radius: 5px;
		font-family: Poppins, Arial, Helvetica, sans-serif;
		border: 0;
		cursor: pointer;

		.unactive {
			cursor: default;
		}
	}
	@media only screen and (max-width:700px){ 
		width: 80vw;
  
		button {
		  font-size: 12px;
		  width: 30px;
		  height: 10px;
		}
  
		.fields-container {
		  display: grid;
		  grid-template-columns: 1fr;
		  gap: 1rem;}
	 }
  
	 .selectType-container {
		display: grid;
		grid-template-columns: 1fr;
		box-sizing: border-box;
		margin:0;
		padding:0;
	 }}
`;
export default UserInvitationModal;
