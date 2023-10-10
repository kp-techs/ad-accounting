import { useEffect, useState } from "react";
import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import { AppProvider } from "./contexts/app";
import { useSupabase } from "./hooks/useSupabase";
import Sidebar from "./components/sidebar";
import MainContent from "./components/main";
import Nav from "./components/nav";
import '@coreui/coreui/dist/css/coreui.min.css'
import useToggle from "./hooks/useToggle";

function App() {
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const [isPanelOpen, togglePanel] = useToggle();
  const [isLinksMenuOpen, toggleLinks] = useToggle();

  useEffect(() => {
    console.log(isLinksMenuOpen)
    supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/login");
      } 
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppProvider>
      <Wrapper>
        <Sidebar isOpen={isPanelOpen} isLinksMenuOpen={isLinksMenuOpen} toggleLinks={toggleLinks} />
        <MainContent>
          <>
            <Nav togglePanel={togglePanel} isLinksMenuOpen={isLinksMenuOpen} toggleLinks={toggleLinks} />
            <main className="outlet-container">
              <section className="outlet">
            <Outlet />
              </section>
            </main>
          </>
        </MainContent>
      </Wrapper>
    </AppProvider>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;

  .outlet-container {
    width: 100%;
    height: 100%;
    background-color: #f3f4f7;
    padding: 50px;
  }

  .outlet{
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.13);
    border-radius: 10px;
  }

  @media only screen and (max-width:700px){  
    grid-template-columns: auto;
  }
`;

export default App;
