import NavBar from "../components/NavBar";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";
import Spinner from "../components/Spinner";

const UPDATE_POST = gql`
  mutation ($editPostInput: EditPostInput) {
    editPost(editPostInput: $editPostInput) {
      content
      createdAt
      updatedAt
    }
  }
`;

const PostData = (props) => {
  const context = useContext(authContext);
  const contentValue = useRef();
  const [errors, setErrors] = useState([]);
  const [postUpdated, setPostUpdated] = useState("");

  const [editPost, { loading }] = useMutation(UPDATE_POST, {
    onCompleted: () => {
      console.log("UPDATED POST SUCCESSFULY");
      setPostUpdated("Post updated successfuly!");
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
  });
  console.log("errors: ", errors);
  const onUpdatePost = () => {
    if (contentValue.current.value !== props.content) {
      const value = {
        content: contentValue.current.value,
        id: props.postId,
      };
      editPost({
        variables: {
          editPostInput: value,
        },
      });
      // if (!errors.length) props.onClose();
    }
  };

  return (
    <>
      <MainWrapper>
        <Title>
          {context.user.name} {context.user.surname}
        </Title>
        <Input ref={contentValue} defaultValue={props.content} />
        <NewWrapper>
          {postUpdated && <PostAdded color="#418a21"> {postUpdated}</PostAdded>}
          {errors &&
            errors.map((error) => (
              <PostAdded color="#ed1a2f">{error.message}</PostAdded>
            ))}
          {/* {!postAdded && !errors.length && <br />} */}

          <Button onClick={onUpdatePost}>Update</Button>
        </NewWrapper>
      </MainWrapper>
    </>
  );
};

const NewWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
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

  width: 75%;

  display: flex;
  flex-direction: column;
  margin: 0 auto;

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

export default PostData;
