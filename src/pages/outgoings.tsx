import styled from "styled-components";

function Outgoings() {
  return (
    <Wrapper>
      <h1>Outgoing</h1>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  box-sizing: border-box;
  display: grid;
  margin: 20px;
  border-radius: 8px;
  border: 1px solid #e8eaed5c;
  background-color: white;
`;

export default Outgoings;
