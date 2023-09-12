import { FC } from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element;
};

const Content: FC<Props> = ({ children }) => {
  return (<Wrapper>
    <Container>{children}</Container>
  </Wrapper>)
};

const Wrapper = styled.main`
  display: flex;
  grid-area: content;
  flex-direction: column;
  overflow: auto;
  background-image: url(assets/images/imagen-fondo.png);
  box-sizing: border-box;
  
  @media only screen and (max-width:700px){
  }
  `
  const Container = styled.section`
  padding: 25px;
  box-sizing: border-box;

background: rgba(125, 125, 125, 0.2);
width:100%;
height: 100%;
`;

export default Content;
