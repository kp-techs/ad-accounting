import React from "react";
import styled from "styled-components";
import AddIncome from "./addIncome";
import AddOutgoing from "./addOutgoing";

function AddAction() {
  const Content = AddIncome ?? AddOutgoing;
  return (
    <Wrapper>
      <Content />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
export default AddAction;
