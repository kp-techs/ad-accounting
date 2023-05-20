import React, { FC } from "react";
import styled from "styled-components";

type Props = {
  tabs: {
    id: string;
    name: string;
    content: JSX.Element;
  }[];
};

const Tab: FC<Props> = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState(tabs[0]?.id);

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  if (!tabs.length) return <></>;

  return (
    <Wrapper>
      <nav className="tab--options">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}>
            {tab.name}
          </button>
        ))}
      </nav>
      <section>{currentTab?.content}</section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template:
    "options" 60px
    "content" 1fr / 1fr;
  gap: 25px;
  padding: 20px;
  nav {
    display: flex;
    grid-area: options;
    gap: 5px;
    border-bottom: 1px solid gray;
  }
  button {
    border: 0;
    background-color: transparent;
    font-size: 16px;
  }
  button:hover {
    /* background-color: #97b1c940; */
    border-bottom: 2px solid #5a61e6;
    cursor: pointer;
  }
  section {
    grid-area: content;
  }
`;
export default Tab;
