import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useAppData from "../hooks/useAppData";
import { Link } from "react-router-dom";

function Nav() {
	const location = useLocation();
	const { profile } = useAppData();
	useEffect(() => {}, [location]);

	return (
		<Wrapper>
			<div className="link-container">
				<Link to={`/incomes`}>Incomes</Link>

				<svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0.5 32L25 0L47.5 32H0.5Z"
						fill={`${location.pathname === "/incomes" ? "#7D7D7D" : "none"}`}
						fill-opacity="0.2"
					/>
				</svg>
			</div>
			<div className="separation">
				<div className="separate-line"></div>
			</div>
			<div className="link-container">
				<Link to={`/outgoings`}>Outgoings</Link>
				<svg
					width="48"
					height="32"
					viewBox="0 0 48 32"
					fill={`${location.pathname === "/outgoings" ? "#7D7D7D" : "none"}`}
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0.5 32L25 0L47.5 32H0.5Z" fill="#7d7d7d0" fill-opacity="0.2" />
				</svg>
			</div>

			{/* <div className="separation">
        <div className="separate-line"></div>
      </div>
      <div className="link-container">
        <Link to={`/reportes`}>Reportes</Link>
        <svg
          width="48"
          height="32"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 32L25 0L47.5 32H0.5Z"
            fill={`${location.pathname === "/reportes" ? "#7D7D7D" : "none"}`}
            fill-opacity="0.2"
          />
        </svg>
      </div> */}
			<div className="separation">
				<div className="separate-line"></div>
			</div>
			<div className="link-container">
				<Link to={`/loans`}>Loans</Link>
				<svg width="48" height="32" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M0.5 32L25 0L47.5 32H0.5Z"
						fill={`${location.pathname === "/loans" ? "#7D7D7D" : "none"}`}
						fill-opacity="0.2"
					/>
				</svg>
			</div>
			{profile?.role === "Admin" ? (
				<>
					<div className="separation">
						<div className="separate-line"></div>
					</div>
					<div className="link-container">
						<Link to={`/configuration`}>Settings</Link>
						<svg
							width="48"
							height="32"
							viewBox="0 0 48 32"
							fill={`${location.pathname === "/configuration" ? "#7D7D7D" : "none"}`}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path d="M0.5 32L25 0L47.5 32H0.5Z" fill="#7d7d7d0" fill-opacity="0.2" />
						</svg>
					</div>
				</>
			) : null}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	box-sizing: border-box;
	gap: 80px;
	flex-direction: row;
	margin: 0;

	a {
		font-size: 24px;
		&:active {
			color: #ffffff;
			background-color: #273b6c55;
			backdrop-filter: blur(40px);
			border-radius: 20px;
		}
	}
	.link-container {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		align-items: center;
		height: 100%;
	}
	.separation {
		padding-top: 20px;
		height: 100%;
		.separate-line {
			border: 1px solid black;
			height: 50px;
		}
	}
`;

export default Nav;
