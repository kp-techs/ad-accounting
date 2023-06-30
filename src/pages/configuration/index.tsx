import styled from "styled-components";
import useToggle from "../../hooks/useToggle";
import UserInvitationModal from "./components/userInvitationModal";
import UsersTable from "./components/usersTable";

function Configuration() {
  const [isModalOpen, toggleModal] = useToggle();
  return (
    <Wrapper>
      <main>
        <UsersTable />
      </main>
      <footer>
        <div className="add-button" onClick={toggleModal}>
          Nuevo usuario
        </div>
        <UserInvitationModal isOpen={isModalOpen} onClose={toggleModal} />
      </footer>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  grid-template-rows: 1fr 50px;
  box-sizing: border-box;
  border-radius: 8px;
  margin: 20px;
  height: 100%;

  main {
    display: grid;
    height: 100%;
  }
  .add-button {
    display: flex;
    padding: 0px 20px;
    background-color: #273b6c;
    color: #ffffff;
    border-radius: 5px;
    height: 30px;
    align-items: center;
    font-family: Poppins;
    cursor: pointer;
  }
  footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 20px;
  }
`;

export default Configuration;
