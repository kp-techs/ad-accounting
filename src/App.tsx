import React from "react";
import { Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Aside from "./components/aside";
import Content from "./components/content";
import Header from "./components/header";

function App() {
  return (
    <>
      <GlobalStyles />

      <Wrapper>
        <Header />
        <Aside />
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </>
  );
}

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`;

const Wrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  grid-template:
    "aside header" 64px
    "aside content" 1fr/250px 1fr;
  background-color: aliceblue;
`;

export default App;
