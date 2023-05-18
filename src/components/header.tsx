import React from "react";
import styled from "styled-components";
import Nav from "./nav";

function Header() {
  React.useState();
  return (
    <Wrapper>
      <Nav />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  grid-area: header;
  margin: 0;
  box-sizing: border-box;
  display: grid;
  width: 100%;
  height: 100%;
  background-color: pink;
`;

export default Header;
