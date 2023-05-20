import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Aside() {
  return (
    <Wrapper className="aside">
      <div className="container--logo">
        <img className="AD-logo" src="assets/images/AD-logo.png" alt="Logo" />
        <img
          className="AD-logotipo"
          src="assets/images/AD-logotipo.png"
          alt="Logo"
        />
      </div>

      <Link to={`/`}>Inicio</Link>
      <Link to={`/incomes`}>Ingresos</Link>
      <Link to={`/outgoings`}>Egresos</Link>
      <Link to={`/reportes`}>Reportes</Link>
      <Link to={`/configuration`}>Configuración</Link>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  display: flex;
  padding: 1px 10px 25px 0;
  box-sizing: border-box;
  gap: 10px;
  flex-direction: column;
  height: 100%;
  width: 100%;
  /* background-color: #d49bd26e; */
  grid-area: aside;

  img {
    height: 60px;
    margin: 5px;
  }
  .AD-logotipo {
    margin: 10px;
    height: 50px;
  }
  .container--logo {
    box-sizing: border-box;
    /* padding: 5px 10px; */
    height: 64px;
    display: flex;
  }

  a {
    text-decoration: none;
    background-color: #97b1c940;
    border-radius: 0 15px 15px 0px;
    text-align: left;
    padding: 10px;
    font-size: 16px;
  }
`;

export default Aside;
