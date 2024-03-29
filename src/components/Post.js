import styled from "styled-components";
import Image from "../images/user.png";
import DeleteImage from "../images/delete-icon.png";
import Button from "./Button";

const Post = (props) => {
  const onClickHandler = () => {
    console.log("clicked");
  };
  const date = new Date(props.date).toString().slice(0, 24);

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
        <PostWrapper>
          <DateWrapper>
            {props.isUpdated ? "(Edited) " : ""}
            {date}
          </DateWrapper>
          {props.isClient && (
            <div>
              <Button
                style={{
                  margin: "0px 10px",
                  borderRadius: "5px",
                  border: "1px solid rgba(79, 76, 129, 1)",
                }}
                onClick={props.onDeletePost}
              >
                Delete
              </Button>
              <Button
                style={{
                  margin: "0px 10px",
                  borderRadius: "5px",
                  border: "1px solid rgba(79, 76, 129, 1)",
                }}
                onClick={props.onOpenDialog}
              >
                Open
              </Button>
            </div>
          )}
        </PostWrapper>
        {/* {props.delete && <button onClick={props.onDeletePost}>Delete</button>} */}
      </SecondWrapper>
    </FirstWrapper>
  );
};

const PostWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

// const Button = styled.button`
//   border-radius: 10px;
//   background: transparent;
//   top: 50px;
//   right: 50px;
//   border: 0px;
//   position: absolute;
//   &:hover: {
//     scale: 1.1;
//   }
//   cursor: pointer;
// `;

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

  // cursor: pointer;
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

  position: relative;
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
