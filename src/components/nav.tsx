/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Nav() {
  return (
    <Wrapper>
      <div className="link-container">
        <Link to={`/incomes`}>Ingresos</Link>
        <svg
          width="48"
          height="32"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 32L25 0L47.5 32H0.5Z"
            fill="#7D7D7D"
            fill-opacity="0.2"
          />
        </svg>
      </div>
      {/* <div className="separation">
        <div className="separate-line"></div>
      </div> */}
      <div className="link-container">
        {/* <Link to={`/outgoings`} className="unavailable">
          Egresos
        </Link> */}
        <svg
          width="48"
          height="32"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 32L25 0L47.5 32H0.5Z"
            fill="#7d7d7d0"
            fill-opacity="0.2"
          />
        </svg>
      </div>
      {/* <div className="separation">
        <div className="separate-line"></div>
      </div> */}
      <div className="link-container">
        {/* <Link to={`/reportes`}>Reportes</Link> */}
        <svg
          width="48"
          height="32"
          viewBox="0 0 48 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.5 32L25 0L47.5 32H0.5Z"
            fill="#7d7d7d0"
            fill-opacity="0.2"
          />
        </svg>
      </div>
    </Wrapper>
  );
}

//TODO: agregar clase active

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  gap: 80px;
  flex-direction: row;
  height: 100px;
  width: 100%;

  a {
    font-size: 24px;
    &.active {
      color: #ffffff;
      background-color: #273b6c;
      backdrop-filter: blur(40px);
      border-radius: 20px;
    }
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
  }
  .separate-line {
    border: 1px solid black;
    height: 50px;
  }
`;

export default Nav;
