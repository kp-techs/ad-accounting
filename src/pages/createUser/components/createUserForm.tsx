import { Field, Form, Formik } from "formik";
import { FC} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSupabase } from "../../../hooks/useSupabase";
import { initialUser } from "../utils/constants";
import { validationNewUserForm } from "../constant";

type Props = {
	isActive: boolean;
	userInfo: UserData;
	setUserInfo: (userInfo: UserData) => void;
};
const CreateUserForm: FC<Props> = ({ isActive, userInfo, setUserInfo }) => {
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
					{({ errors, touched }) => (
						<Form>
							<div className="log-container">
								<div className="log">
									<h1>NEW USER</h1>
									<div className="field-container">
										<div className="img-container">
										<img src="assets/images/user-icon.svg" className="input-icon" />
										</div>
										<Field required type="text" placeholder="Name" name="name" className="user-icon" />
									</div>

									<div className="field-container">
									<div className="img-container">
										<img src="assets/images/pass-icon.svg" className="input-icon" />
										</div>
										<Field
											required
											autocomplete="new-password"
											type="password"
											placeholder="Password"
											name="password"
											className="password-icon"
										/>
									</div>

									<div className="field-container">
									<div className="img-container">
										<img src="assets/images/pass-icon.svg" className="input-icon" />
										</div>
										<Field
											required
											type="password"
											placeholder="Confirme password"
											name="confirmPassword"
											className="password-icon"
										/>
									</div>

									<div className="button-container">
										<button type='submit' className="button">Save</button>
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
		height: 472px;
		padding: 30px;
		padding-top: 0;
		box-sizing: border-box;
	}

	h1 {
		font-family: "Poppins-Bold", "Poppins";
		font-style: normal;
		font-size: 20px;
		line-height: 48px;
		letter-spacing: 0.175em;
		color: #ffffff;
		margin-top: 40px;
		margin-bottom: 15px;
	}
	.field-container {
		position: relative;
		border-radius: 20px;
		margin-bottom: 20px;
		width: 100%;
		box-sizing: border-box;
		margin-bottom: 20px;

		.img-container{
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
		font-size: 16px;
		line-height: 36px;
		letter-spacing: -0.005em;
		outline: 0;
		border: 0;
		padding-right: 10px;
		padding-left: 50px;
		border-radius: 20px;
	}

	form div {
		align-items: center;
	}

	.button-container {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 10px;
	}

	.button {
		background-color: #4e8fff;
		border-color: #4e8fff;
		border-radius: 10px;
		border: 0;
		width: 190px;
		font-family: Poppins;
		font-style: normal;
		font-size: 14px;
		line-height: 30px;
		letter-spacing: 0.175em;
		color: #ffffff;
		margin: 0px 25px 20px;
		display: flex;
		justify-content: center;
		padding: 8px;

		&:hover {
			background-color: #82aefad0;
			cursor: pointer;
		}
	}
	.errors {
		display:flex;
		text-align: center;
		flex-direction: column;
	}

	p {
		color: #e39292;
		font-size: 14px;
		margin:0;
	}
`;

export default CreateUserForm;
