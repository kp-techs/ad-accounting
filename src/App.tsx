import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import Aside from "./components/aside";
import Content from "./components/content";
import Header from "./components/header";
import Consultes from "./pages/consultes";
import Incomes from "./pages/incomes";
import Outgoings from "./pages/outgoings";

function App() {
  const [page, setPage] = React.useState("Incomes");

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Header />
        <Aside setPage={setPage} />
        <Content>
          {page === "Incomes" ? (
            <Incomes />
          ) : page === "Outgoings" ? (
            <Outgoings />
          ) : (
            <Consultes />
          )}
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
    "header header" 64px
    "aside content" 1fr/250px 1fr;
  background-color: #b9297b;
`;

export default App;
