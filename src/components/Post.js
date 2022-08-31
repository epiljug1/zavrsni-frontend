import styled from "styled-components";
import Image from "../images/avatar.png";

const Post = (props) => {
  const onClickHandler = () => {
    console.log("clicked");
  };

  const date = new Date(props.date).toString().slice(0, 24);
  // console.log(date.toString().slice(0, 24));

  return (
    <FirstWrapper onClick={onClickHandler}>
      <SecondWrapper>
        <Title>
          <img
            src={Image}
            style={{ width: "50px", borderRadius: "50%" }}
            alt="Avatar"
          />
          {props.name + " " + props.surname}
        </Title>
        <Description>{props.description}</Description>
        <DateWrapper>{date}</DateWrapper>
      </SecondWrapper>
    </FirstWrapper>
  );
};

const FirstWrapper = styled.div`
  width: 55vw;
  height: 42vh;

  background: rgb(79, 76, 129);
  background: linear-gradient(
    180deg,
    rgba(79, 76, 129, 1) 0%,
    rgba(156, 70, 172, 1) 40%
  );

  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  margin: 100px auto;

  cursor: pointer;
`;

const SecondWrapper = styled.div`
  width: 80%;
  height: 70%;

  background: rgb(139, 134, 221);
  background: linear-gradient(
    180deg,
    rgba(139, 134, 221, 1) 0%,
    rgba(206, 150, 241, 1) 35%
  );

  border-radius: 20px;

  padding: 30px 50px;

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

const Description = styled.div`
  font-size: 1.2rem;
  color: rgba(0, 0, 0);

  font-weight: 400;

  text-align: justify;
  text-justify: inter-word;

  cursor: text;
`;

const DateWrapper = styled.div`
  font-size: 1.1rem;
`;

export default Post;
