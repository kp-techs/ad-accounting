import styled from "styled-components";

function Configuration() {
  return (
    <Wrapper>
      <h1>Página para configuraciones</h1>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  box-sizing: border-box;
  display: grid;
  margin: 20px;
  border-radius: 8px;
  border: 1px solid #e8eaed5c;
  background-color: white;
`;

export default Configuration;
