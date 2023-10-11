import { FC } from "react";
import styled from "styled-components";

type Props = {
  children: JSX.Element;
};

const MainContent: FC<Props> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.main`

`;

export default MainContent;
