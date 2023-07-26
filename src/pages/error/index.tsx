import { styled } from "styled-components";

function ErrorPage() {
  //TO DO: mejorar el diseno de esta pagina.
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
