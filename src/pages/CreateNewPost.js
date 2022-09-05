import NavBar from "../components/NavBar";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";
import Spinner from "../components/Spinner";

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

const GET_CLIENT_POSTS = gql`
  query ($getClientPostsId: String!) {
    getClientPosts(email: $getClientPostsId) {
      id
      content
      createdAt
      updatedAt
      author {
        name
        surname
      }
    }
  }
`;

const CreateNewPost = (props) => {
  const context = useContext(authContext);
  const navigate = useNavigate();

  const content = useRef();
  const [errors, setErrors] = useState([]);
  const [postAdded, setPostAdded] = useState("");

  const {
    data: clientPosts,
    refetch,
    loading: loadingClientPosts,
  } = useQuery(GET_CLIENT_POSTS, {
    variables: {
      getClientPostsId: context.user.email,
    },
  });

  const isLimit = clientPosts?.getClientPosts.length === 3;

  const [createNewPost, { loading, error, data }] = useMutation(
    CREATE_NEW_POST,
    {
      onCompleted: () => {
        // navigate("/personal-posts");
        refetch({
          getClientPostsId: context.user.email,
        });
        content.current.value = "";
        setPostAdded("Post added successfuly!");
        setErrors([]);
      },
      onError: ({ graphQLErrors }) => {
        setErrors(graphQLErrors);
        setPostAdded(false);
      },
    }
  );

  const onCloseHandler = () => {
    navigate("/personal-posts");
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
      {loading && <Spinner />}
      <MainWrapper>
        <Title>
          {context.user.name} {context.user.surname}
        </Title>
        <Input ref={content} />
        <NewWrapper>
          {postAdded && !isLimit && (
            <PostAdded color="#418a21"> {postAdded}</PostAdded>
          )}
          {errors &&
            errors.map((error) => (
              <PostAdded color="#ed1a2f">{error.message}</PostAdded>
            ))}
          {isLimit && (
            <PostAdded color="#c728c7">
              Hey {context.user.username}, can't have more than 3 posts today!
            </PostAdded>
          )}
          {!postAdded && !isLimit && !errors.length && <br />}
          <ButtonWrapper>
            <Button onClick={onCloseHandler}>Close</Button>
            {!isLimit && <Button onClick={onCreateHandler}>Post</Button>}
          </ButtonWrapper>
        </NewWrapper>
      </MainWrapper>
    </>
  );
};

const NewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 1100px) {
    justify-content: center;
    gap: 10px;
  }
`;

const PostAdded = styled.div`
  text-align: center;
  color: ${(props) => props.color};
  border: 2px solid;
  font-size: 1.1rem;
  border-radius: 10px;
  margin: 5px;

  padding: 5px;
  width: fit-content;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  @media (max-width: 500px) {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }
`;

const Button = styled.button`
  font-size: 1.1rem;
  border-radius: 10px;
  width: 140px;
  height: 35px;

  &:hover {
    background: rgba(0, 0, 0, 0.4);
    font-weight: bold;
  }
`;

const Input = styled.textarea`
  // min-width: 800px;
  // max-width: 100%;
  min-height: 170px;
  height: 100%;
  width: 97%;

  box-shadow: 0px 2px 16px hsl(260deg 10% 10% / 0.5);
  border-radius: 10px;
  border-color: transparent;

  margin: 30px 0px;

  font-size: 1.125rem;

  resize: none;

  padding: 10px;

  align-self: center;

  @media (max-width: 750px) {
    min-height: 100px;
  }
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

  position: relative;
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

  @media (max-width: 1100px) {
    align-items: center !important;
  }
`;

export default CreateNewPost;
