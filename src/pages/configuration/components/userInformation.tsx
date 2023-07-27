import styled from "styled-components";
import NoInfo from "../../../components/noInfo";
import useAppData from "../../../hooks/useAppData";

function UserInformation() {
  const { profile } = useAppData();
  return (
    <Wrapper>
      {profile ? (
        <>
          <p className="name">{profile.name}</p>
          <p>{profile.email}</p>
          <p>{profile.role}</p>
        </>
      ) : (
        <NoInfo />
      )}
    </Wrapper>
  );
}

export default UserInformation;

const Wrapper = styled.section`
  padding: 0 10px;
  margin: 0 5px;
  border-radius: 2px;
  border-bottom: 1px solid #00000044;

  p {
    font-style: Poppins;
    font-size: 13px;
    color: #000000a0;
    margin: 0;
  }
  .name {
    font-size: 14px;
    color: #000;
  }
`;
