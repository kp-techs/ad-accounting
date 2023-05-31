import styled from "styled-components";

function Header() {
  return (
    <Wrapper>
      <div className="container--log"></div>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  grid-area: header;
  margin: 0;
  box-sizing: border-box;
  display: grid;
  width: 100%;
  height: 100%;
  nav {
    display: grid;
    grid-template: "logo log" 1fr/1fr 150px;
    box-sizing: border-box;

    button {
      width: 100%;
      height: 100%;
    }

    .container--log {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      grid-area: log;
      padding: 22px;
    }
  }
`;

export default Header;
