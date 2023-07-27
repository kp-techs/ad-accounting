import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function ErrorPage() {
  const navigate = useNavigate()
	return (
		<Wrapper>
			<div className="container">
				<h1>404</h1>
				<h3>Página no encontrada</h3>
				<p>La página que estas buscando no existe o ha ocurrido un error.</p>
				<button onClick={()=>navigate('/')}>Volver al Inicio</button>
				<div className="shapeUp shape">
					<img src="./assets/images/DottedShape.svg" />
				</div>
				<div className="shapeDown shape">
					{" "}
					<img src="assets/images/DottedShape.svg" />
				</div>
			</div>
		</Wrapper>
	);
}

const Wrapper = styled.section`
	display: grid;
	place-content: center;
	place-items: center;
	width: 100vw;
	height: 100vh;
	font-family: Poppins;
	color: #fff;

	h1 {
		font-size: 110px;
		margin: 0;
	}
	h3 {
		font-size: 25px;
		margin: 0;
	}
	p {
		font-size: 14px;
	}

	.container {
		width: 570px;
		height: 400px;
		padding: 40px 0;
		border-radius: 15px;
		font-size: 40px;
		text-align: center;
		display: grid;
		place-content: center;
		place-items: center;
		background-color: #1e81b0;
		position: relative;
	}

	.shape {
		position: absolute;
	}
	.shapeUp {
		top: 15px;
		left: 10px;
	}
	.shapeDown {
		bottom: 0px;
		right: 10px;
	}

	button {
		background-color: #fff;
		border-radius: 10px;
		border: 0;
		width: 150px;
		font-family: Poppins;
		font-style: normal;
		font-size: 13px;
		color: #031b44d0;
		margin: 0px 25px 20px;
		display: flex;
		justify-content: center;
		padding: 8px;
		cursor: pointer;
	}
`;

export default ErrorPage;
