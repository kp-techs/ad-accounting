import { styled } from "styled-components";

function ErrorPage() {
  return (
    <Wrapper>
      <h1>Error inesperado.</h1>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  font-size: 40px;
  text-align: center;
`;

export default ErrorPage;
