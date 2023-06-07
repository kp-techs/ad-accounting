import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Outlet } from "react-router-dom";
import Aside from "./components/aside";
import Content from "./components/content";
import Header from "./components/header";
import { AppProvider } from "./contexts/app";

function App() {
  return (
    <AppProvider>
      <Wrapper>
        <Header />
        <Aside />
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </AppProvider>
  );
}

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
