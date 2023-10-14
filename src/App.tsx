import { useEffect, useState } from "react";
import styled from "styled-components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { AppProvider } from "./contexts/app";
import { getTotalByMonth, useSupabase } from "./hooks/useSupabase";
import Sidebar from "./components/sidebar";
import MainContent from "./components/main";
import Nav from "./components/nav";
import '@coreui/coreui/dist/css/coreui.min.css'
import useToggle from "./hooks/useToggle";

function App() {
  const navigate = useNavigate();
  const { supabase } = useSupabase();
  const [isPanelOpen, togglePanel] = useToggle();
  const location = useLocation();

  useEffect(() => {
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
        <Sidebar isOpen={isPanelOpen} toggle={togglePanel} />
        <MainContent>
          <>
            <Nav togglePanel={togglePanel} />

            <main className="outlet-container">
                <Outlet />

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
    height: calc(100%-40px);
    background-color: #f3f4f7;
    padding: 50px;
  }

  @media only screen and (max-width:700px){  
    display: flex;

      .outlet-container {
        /* padding: 10px; */

        .outlet {
          /* padding: 10px; */
        }
      }
  }
`;

export default App;
