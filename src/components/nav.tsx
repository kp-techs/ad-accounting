import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Nav() {
  return (
    <Wrapper>
      <Link to={`/incomes`}>Ingresos</Link>
      <div className="separate-line"></div>
      <Link to={`/outgoings`}>Egresos</Link>
      <div className="separate-line"></div>
      <Link to={`/reportes`}>Reportes</Link>
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

  .separate-line {
    border: 1px solid black;
    height: 50px;
  }
`;

export default Nav;
