import React, { useEffect } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import Content from "./components/content";
import Header from "./components/header";
import { AppProvider } from "./contexts/app";
import { useSupabase } from "./hooks/useSupabase";

function App() {
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  //TO DO: Actualizar ultima conexion cada vez que la session cambie

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } else {
        navigate("/");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
