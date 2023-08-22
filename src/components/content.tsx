import { FC } from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element;
};

const Content: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.main`
  display: flex;
  grid-area: content;
  flex-direction: column;
  height: calc(100% - 30px);
  overflow: hidden;
  border-radius: 10px 0 0;
  padding: 25px;
  margin: 0 15px 10px;
  background: rgba(125, 125, 125, 0.2);
  border-radius: 40px;
  box-sizing: border-box;
`;

export default Content;
