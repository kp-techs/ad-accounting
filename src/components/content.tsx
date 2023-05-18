import { FC } from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element;
};

const Content: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.main`
  display: grid;
  grid-area: content;
  width: 100%;
  height: 100%;
  background-color: #c7719e;
`;

export default Content;
