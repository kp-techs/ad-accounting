import React from "react";
import styled from "styled-components";

function Aside({ setPage }: any) {
  return (
    <Wrapper>
      <button onClick={() => setPage("Incomes")}>Incomes</button>
      <button onClick={() => setPage("Outgoings")}>Outgoings</button>
      <button onClick={() => setPage("Consultes")}>Consultes</button>
    </Wrapper>
  );
}

const Wrapper = styled.aside`
  display: flex;
  padding: 25px 10px 25px 0;
  box-sizing: border-box;
  gap: 5px;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #d49bd2;
  grid-area: aside;

  button {
    border-radius: 0 15px 15px 0px;
    text-align: left;
    height: 32px;
    font-size: 15px;
  }
`;

export default Aside;
