import styled from "styled-components";
import Image from "../images/avatar.png";

const Wrapper = styled.div`
  width: 200px;
  height: 200px;

  background: rgb(139, 134, 221);
  background: linear-gradient(
    180deg,
    rgba(139, 134, 221, 1) 0%,
    rgba(206, 150, 241, 1) 35%
  );

  border-radius: 20px;

  padding: 10px 40px;
  margin: 20px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  color: rgba(0, 0, 0);

  display: flex;
  align-items: center;
  gap: 2%;
`;

const Client = (props) => {
  return (
    <Wrapper>
      <Title>
        <img
          src={Image}
          style={{ width: "50px", borderRadius: "50%" }}
          alt="Avatar"
        />
        {props.name + " " + props.surname}
      </Title>
      <div>
        Username: <strong>{props.username}</strong>
      </div>
      <div>
        Email: <strong>{props.email}</strong>
      </div>
    </Wrapper>
  );
};

export default Client;
