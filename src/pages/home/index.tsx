import styled from "styled-components";

function Home() {
  return (
    <Wrapper>
      <section className="resumen">
        <div>
          <p className="title">INGRESOS</p>  
          <p></p>
        </div>
        <div>
          <p className="title">EGRESOS</p>  
          <p></p>
        </div>
        <div>
          <p className="title">PRESTAMOS</p>  
          <p></p>
        </div>
        <div>
          <p className="title">BALANCE</p>  
          <p></p>
        </div>
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  box-sizing: border-box;
  display: grid;
  margin: 20px;
  border-radius: 8px;
  background-color: #ffffffc0;
`;

export default Home;
