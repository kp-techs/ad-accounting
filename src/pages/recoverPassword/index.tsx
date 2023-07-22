import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import { useSupabase } from "../../hooks/useSupabase";

const RecoverPassword = () => {
	//TO DO: Crear ventana para recuperar contraseña
	const navigate = useNavigate();
	const { supabase } = useSupabase();

	const [isLoading, setLoading] = useState(false);
	const [submitted, setSubmitted] = useState(false);

	return (
		<Wrapper>
			<Formik
				initialValues={{ email: "" }}
				onSubmit={(values) => {
					supabase.auth.resetPasswordForEmail(values.email, {
						redirectTo: "http://localhost:3000/recover_password"
					});

					setLoading(true);
					setTimeout(() => {
						setLoading(false);
						setSubmitted(true);
					}, 600);
				}}
			>
				<Form>
					<div className="log">
						<h1>¿Olvidó su contraseña?</h1>
						<div className="text-container">
							<p>
								{submitted
									? `El correo de reestablecer contraseña ya ha sido enviado. 
                    Si aún no ha recibido ningún correo, revise en Spam o verifique el correo introducido, y envíe de nuevo.`
									: `No se preocupe, suele pasar. Por favor, ingrese su dirección correo electrónico. 
                    A la mayor brevedad, le enviaremos un correo para que pueda reestablecer su contraseña.`}
							</p>
						</div>

						<div className="field-container">
							<div className="img-container">
								<img src="assets/images/email.svg" className="input-icon" />
							</div>

							<Field type="email" placeholder="Correo electrónico" name="email" />
						</div>

						<div className="button-container">
							<button type="submit" className="button">
								{isLoading ? (
									<img className="loading" src="assets/images/preloader.gif" />
								) : submitted ? (
									"Enviar otra vez"
								) : (
									"Enviar enlace"
								)}
							</button>
							<div className="button" onClick={() => navigate("/")}>
								Cancelar
							</div>
						</div>
					</div>
				</Form>
			</Formik>
		</Wrapper>
	);
};

const Wrapper = styled.div`

	.log {
		display: flex;
		flex-direction: column;
		align-items: center;
		background: rgba(0, 0, 0, 0.14);
		border-radius: 40px;
		backdrop-filter: blur(5.5px);
		height: 472.88px;
		width: 330px;
		padding: 30px;
		box-sizing: border-box;
	}

	h1 {
		font-family: "Poppins-Bold", "Poppins";
		font-style: normal;
		color: #ffffff;
		font-size: 15px;
		margin: 20px 0 0 0;
	}

	p {
		font-family: "Poppins-Bold", "Poppins";
		font-style: normal;
		color: #ffffff;
		font-size: 12.5px;
		text-align: justify;
	}

	.field-container {
		position: relative;
		border-radius: 20px;
		margin-bottom: 25px;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 30px;

		.img-container {
			height: 100%;
			padding: 0 10px;
			position: absolute;
			display: flex;
			align-items: center;
		}
		.input-icon {
			height: 20px;
		}
	}

	input {
		font-family: Poppins;
		width: 210px;
		height: 50px;
		font-style: italic;
		font-size: 15px;
		line-height: 36px;
		letter-spacing: -0.005em;
		outline: 0;
		border: 0;
		padding-right: 10px;
		padding-left: 50px;
		border-radius: 20px;
	}

	.button-container {
		width: 100%;
	}

	button {
		border: 0;
		/* width: 270px; */
	}
	.button {
		width: 270px;
		background-color: #4e8fff;
		border-color: #4e8fff;
		border-radius: 10px;
		font-family: Poppins;
		font-style: normal;
		font-size: 14px;
		line-height: 30px;
		letter-spacing: 0.175em;
		color: #ffffff;
		margin-bottom: 15px;
		display: flex;
		justify-content: center;
		padding: 8px;

		&:hover {
			background-color: #82aefad0;
			cursor: pointer;
		}
	}

	.loading {
		height: 30px;
	}
`;

export default RecoverPassword;
