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
      <nav className="tab-options">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${activeTab === tab.id ? "active" : null}`}
          >
            {tab.name}
          </button>
        ))}
      </nav>
      <section className="tab-content">{currentTab?.content}</section>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  gap: 25px;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;

  .tab-options {
    display: flex;
    gap: 15px;
    height: 60px;
    border-bottom: 1px solid gray;
    overflow:scroll;
  }

  .tab-content {
    height: calc(100% - 85px);
  }

  button {
    border: 0;
    background-color: transparent;
    font-size: 18px;
    border-bottom: 2px solid transparent;
    &:hover {
      border-bottom: 2px solid #00000026;
      cursor: pointer;
    }
    &.active {
      border-bottom: 2px solid #5a61e6;
      cursor: pointer;
    }
  }

  @media only screen and (max-width:700px){
  button {
    font-size:14px;
  }
  }
`;
export default Tab;
