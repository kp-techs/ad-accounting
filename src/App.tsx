import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Content from "./components/content";
import Header from "./components/header";
import { AppProvider } from "./contexts/app";

function App() {
  return (
    <AppProvider>
      <Wrapper>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Wrapper>
    </AppProvider>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template:
    "header" 170px
    "content" 1fr / 1fr;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-image: url(assets/images/imagen-fondo.png);
`;

export default App;
