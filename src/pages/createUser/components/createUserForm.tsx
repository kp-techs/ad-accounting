import { Field, Form, Formik } from "formik";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSupabase } from "../../../hooks/useSupabase";
import { initialUser } from "../utils/constants";
import { validationNewUserForm } from "../../incomes/constants";

type Props = {
	isActive: boolean;
	userInfo: UserData;
	setUserInfo: (userInfo: UserData) => void;
};
const CreateUserForm: FC<Props> = ({ isActive, userInfo, setUserInfo }) => {
	//TO DO: Crear ventana para recuperar contraseña

	const { supabase } = useSupabase();
	const navigate = useNavigate();

	return (
		<Wrapper>
			<div className="logo-container">
				<img className="AD-logo" src="assets/images/LOGO.png" alt="Logo" />
			</div>

			{isActive ? (
				<Formik
					validationSchema={validationNewUserForm}
					initialValues={userInfo}
					onReset={() => setUserInfo(initialUser)}
					onSubmit={(values) => {
						supabase.auth.updateUser({
							password: values.password,
							data: { name: values.name }
						});
						navigate("/");
					}}
				>
					{({ values, errors, touched }) => (
						<Form>
							<div className="log-container">
								<div className="log">
									<h1>NUEVO USUARIO</h1>
									<div className="field-container">
										<Field required type="text" placeholder="Nombre" name="name" className="user-icon" />
									</div>

									<div className="field-container">
										<Field
											required
											type="password"
											placeholder="Contraseña"
											name="password"
											className="password-icon"
										/>
									</div>

									<div className="field-container">
										<Field
											required
											type="password"
											placeholder="Repetir contraseña"
											name="confirmPassword"
											className="password-icon"
										/>
									</div>

									<div className="button-container">
										<div className="button">Guardar</div>
									</div>
									<div className="errors">
										{errors.name && touched.name && <p>{errors.name}</p>}
										{errors.password && touched.password && <p>{errors.password}</p>}
										{errors.confirmPassword && touched.confirmPassword && (
											<p>{errors.confirmPassword}</p>
										)}
									</div>
								</div>
							</div>
						</Form>
					)}
				</Formik>
			) : null}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	font-family: Poppins;
	display: flex;
	height: 100vh;
	width: 100vw;
	justify-content: center;
	align-items: center;
	gap: 250px;

	.linkLabel {
		font-weight: 400;
		font-size: 14px;
		line-height: 30px;
		letter-spacing: -0.005em;
		font-style: italic;
		text-decoration: none;
		font-family: "Poppins";
	}

	img {
		border-radius: 10px;
	}

	.log-container {
		width: 330px;
		height: 472.875px;
		background: #085690;
		box-shadow: -15px 0px 24px rgba(0, 0, 0, 0.25);
		border-radius: 40px;
		padding: 85px 45px;
	}
	.log {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(0, 0, 0, 0.14);
		border-radius: 40px;
		backdrop-filter: blur(5.5px);
		width: 100%;
		height: 100%;
	}

	h1 {
		font-family: "Poppins-Bold", "Poppins";
		font-style: normal;
		font-size: 20px;
		line-height: 48px;
		letter-spacing: 0.175em;
		color: #ffffff;
		margin-top: 45px;
		margin-bottom: 0px;
	}
	.field-container {
		position: relative;
		background-color: rgba(255, 255, 255, 0.52);
		border-radius: 20px;
		margin-bottom: 20px;
	}

	input {
		font-family: Poppins;
		width: 225px;
		height: 50px;
		font-style: italic;
		font-size: 16px;
		line-height: 36px;
		letter-spacing: -0.005em;
		color: #ffffff;
		outline: 0;
		border: 0;

		&::placeholder {
			color: #dadada;
		}
	}

	form div {
		align-items: center;
	}
	.button-container {
		width: 100%;
		display: flex;
		flex-direction: column;

	}

	.button {
		background-color: #4e8fff;
		border-color: #4e8fff;
		border-radius: 10px;
		width: 190px;
		font-family: Poppins;
		font-style: normal;
		font-size: 14px;
		line-height: 30px;
		letter-spacing: 0.175em;
		color: #ffffff;
		margin: 10px 25px 20px;
		display: flex;
		justify-content: center;
		padding: 8px;

		&:hover {
			background-color: #82aefad0;
			cursor: pointer;
		}
	}

	.user-icon {
		background: url(assets/images/user-icon.svg) no-repeat 10px 10px;
		padding-left: 43px;
	}
	.password-icon {
		background: url(assets/images/pass-icon.svg) no-repeat 10px 13px;
		padding-left: 40px;
	}

	.errors {
		display:flex;
		text-align: center;
		flex-direction: column;
	}

	p {
		color: #e39292;
		font-size: 14px;
		// margin-bottom: 5px;
		margin:0;
	}
`;

export default CreateUserForm;
