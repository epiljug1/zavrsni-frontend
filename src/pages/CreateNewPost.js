import NavBar from "../components/NavBar";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { gql, useMutation } from "@apollo/client";
import { useContext, useRef, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";

const CREATE_NEW_POST = gql`
  mutation ($newPostInput: NewPostInput) {
    createNewPost(newPostInput: $newPostInput) {
      content
      author {
        name
      }
    }
  }
`;

const CreateNewPost = (props) => {
  const [errors, setErrors] = useState([]);
  const [createNewPost, { loading, error, data }] = useMutation(
    CREATE_NEW_POST,
    {
      update: (proxy, { data: { createNewPost: clientData } }) => {
        navigate("/personal-posts");
      },
      onError: ({ graphQLErrors }) => {
        setErrors(graphQLErrors);
      },
    }
  );

  const context = useContext(authContext);
  console.log(context);
  const navigate = useNavigate();
  const content = useRef();
  const onCloseHandler = () => {
    navigate(-1);
  };
  const onCreateHandler = () => {
    createNewPost({
      variables: {
        newPostInput: {
          content: content.current.value,
          author: context.user.email,
        },
      },
    });
  };
  return (
    <>
      <NavBar />
      <MainWrapper>
        <Title>
          {context.user.name} {context.user.surname}
        </Title>
        <Input ref={content} />
        <ButtonWrapper>
          <Button onClick={onCloseHandler}>Close</Button>
          <Button onClick={onCreateHandler}>Post</Button>
        </ButtonWrapper>
      </MainWrapper>
    </>
  );
};

const ButtonWrapper = styled.div`
  align-self: flex-end;
  gap: 10px;
`;

const Button = styled.button`
  font-size: 1.1rem;
  border-radius: 10px;
  margin: 10px 20px;
  width: 140px;
  height: 35px;

  &:focus {
    background: rgba(0, 0, 0, 0.4);
    font-weight: bold;
  }
`;

const Input = styled.textarea`
  min-width: 800px;
  max-width: 100%;
  min-height: 100px;
  height: 100%;
  width: 100%;

  box-shadow: 0px 2px 16px hsl(260deg 10% 10% / 0.5);
  border-radius: 10px;
  border-color: transparent;

  margin: 30px 0px;

  font-size: 1.125rem;

  resize: none;

  padding: 10px;

  align-self: center;
`;

const Title = styled.div`
  font-weight: 800;
  font-size: 1.4rem;
  color: black;
`;

const MainWrapper = styled.div`
  overflow: scroll;

  width: 50%;
  height: 40%;

  display: flex;
  flex-direction: column;

  margin: 150px 20px 1000px;
  //   margin: auto;
  //   top: 0;
  //   left: 0;
  //   right: 0;
  //   bottom: 100px;

  padding: 30px 40px 10px;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;

  background: #d9cece;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export default CreateNewPost;
