import styled from "styled-components";

function Home() {
  return (
    <Wrapper>
      <h1>Esta es la página de inicio de la aplicación.</h1>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  box-sizing: border-box;
  display: grid;
  margin: 20px;
  border-radius: 8px;
  background-color: #ffffffc0;
`;

export default Home;
