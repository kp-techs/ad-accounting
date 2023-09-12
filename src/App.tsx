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
    "header" auto
    "content" 1fr / auto;
  width: 100vw;
  height: calc(100vh - 10px);
  box-sizing: border-box;
`;

export default App;
