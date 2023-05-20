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
  border-radius: 10px 0 0;
  overflow: hidden;
  background-image: url(assets/images/cloud-background.jpeg);
  /* background-color: #b59aa7; */
`;

export default Content;
