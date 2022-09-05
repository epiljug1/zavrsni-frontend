import Post from "../components/Post";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";
import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Image from "../images/create.png";
import { useNavigate } from "react-router";
import Spinner from "../components/Spinner";
import NumOfPosts from "../components/NumOfPosts";

//
import { Dialog, DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import PostData from "./PostData";
//

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

const DELETE_POST = gql`
  mutation ($deletePost: DeletePostInput!) {
    deletePost(deletePost: $deletePost)
  }
`;

const GET_POST_BY_ID = gql`
  query ($getPostByIdId: String) {
    getPostById(id: $getPostByIdId) {
      content
      author {
        name
        surname
      }
    }
  }
`;

const ClientPosts = (props) => {
  const navigate = useNavigate();
  const context = useContext(AuthContext);

  const [postId, setPostId] = useState(null);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [search, setSearch] = useState("");
  const [errors, setErrors] = useState([]);

  const onCreatePostHandler = () => {
    navigate("/create-new-post");
  };

  const { data: postById, refetch: refetchPost } = useQuery(GET_POST_BY_ID);

  const [deletePost, { loading: deleteLoading }] = useMutation(DELETE_POST, {
    update: () => {
      refetch({
        getClientPostsId: context.user.email,
      });
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
  });

  const { data, refetch, loading } = useQuery(GET_CLIENT_POSTS, {
    variables: {
      getClientPostsId: context.user.email,
    },
  });

  useEffect(() => {
    refetch({
      getClientPostsId: context.user.email,
    });
  });

  const onSearchHandler = (event) => {
    clearTimeout(debounce);
    setLoadingSpinner(true);

    var debounce = setTimeout(() => {
      setSearch(event.target.value);
      setLoadingSpinner(false);
    }, 600);
  };

  const anyPostAvailable = data?.getClientPosts?.length > 0;
  const isLimit = data?.getClientPosts.length === 3;

  const [showDialog, setShowDialog] = React.useState(false);
  const onOpenDialogHandler = (postId) => {
    setLoadingSpinner(true);
    setPostId(postId);

    refetchPost({
      getPostByIdId: postId,
    });

    setTimeout(() => {
      setShowDialog(true);
      setLoadingSpinner(false);
    }, 500);
  };

  const onCloseDialogHandler = () => {
    setPostId("");
    setShowDialog(false);
  };

  return (
    <>
      <Dialog
        isOpen={showDialog}
        onDismiss={onCloseDialogHandler}
        style={{ background: "transparent" }}
      >
        <PostData
          content={postById?.getPostById?.content}
          postId={postId}
          onClose={onCloseDialogHandler}
        />
      </Dialog>
      <NavBar />
      <SearchFilter>
        <Input type="text" placeholder="Search" onChange={onSearchHandler} />
        {!isLimit && (
          <Button onClick={onCreatePostHandler}>
            <img src={Image} alt="img" style={{ width: "40px" }} />
          </Button>
        )}
      </SearchFilter>

      {(loading || deleteLoading || loadingSpinner) && <Spinner />}
      <MainWrapper>
        {anyPostAvailable && (
          <NumOfPosts>
            {isLimit ? (
              <strong> You can only have 3 post in one day!</strong>
            ) : (
              <div>
                Number of posts: <strong>{data?.getClientPosts?.length}</strong>
              </div>
            )}
          </NumOfPosts>
        )}
        {data?.getClientPosts
          ?.filter((post) => post.content.includes(search))
          .map((post) => (
            <Post
              key={post.id}
              name={post.author?.name}
              surname={post.author?.surname}
              description={post.content}
              date={post.createdAt}
              isUpdated={post.createdAt !== post.updatedAt}
              delete
              isClient
              isLimit
              onOpenDialog={() => {
                onOpenDialogHandler(post.id);
              }}
              onDeletePost={() => {
                console.log("onDeletePost");
                deletePost({
                  variables: {
                    deletePost: {
                      id: post.id,
                    },
                  },
                });
              }}
            />
          ))}
        {!anyPostAvailable && (
          <NoPosts>
            Hey <strong>{context.user.username}</strong>, you don't have any
            posts today!
          </NoPosts>
        )}
      </MainWrapper>
    </>
  );
};

const NoPosts = styled.div`
  text-align: center;
  color: black;
  font-size: 1.2rem;
  margin: 10px;
`;

const Button = styled.button`
  border-radius: 10px;
  background: transparent;
  margin-left: auto;
  border: 0px;
  &:hover {
    scale: 1.2;
    cursor: pointer;
  }
`;

const SearchFilter = styled.div`
  display: flex;
  margin: 60px 1px 20px;
  width: 80%;
`;
const Input = styled.input`
  font-size: 1.125rem;
  padding: 10px;
  margin: 10px;
  background: #e8d9d8;
  opacity: 0.4;
  border: 1px solid white;
  border-radius: 3px;

  ::placeholder {
    color: rgba(0, 0, 0, 0.6);
  }
`;

const MainWrapper = styled.div`
  overflow: scroll;

  position: relative;

  width: 80vw;
  height: 90%;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;

  background: #d9cece;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export default ClientPosts;
