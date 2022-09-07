import Post from "../components/Post";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import NumOfPosts from "../components/NumOfPosts";

const GET_ALL_POSTS = gql`
  query {
    posts {
      content
      createdAt
      updatedAt
      author {
        name
        surname
        username
      }
    }
  }
`;

const AllPosts = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS);
  const [search, setSearch] = useState("");
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const onSearchHandler = (event) => {
    clearTimeout(debounce);
    setLoadingSpinner(true);
    var debounce = setTimeout(() => {
      setSearch(event.target.value);
      setLoadingSpinner(false);
    }, 600);
  };

  useEffect(() => {
    refetch();
  });

  const posts = data?.posts?.filter((post) => post.content.includes(search));
  const anyPostAvailable = posts?.length > 0;

  return (
    <>
      <NavBar />
      <SearchFilter>
        <Input type="text" placeholder="Search" onChange={onSearchHandler} />
      </SearchFilter>
      {(loading || loadingSpinner) && <Spinner />}
      <MainWrapper>
        {anyPostAvailable && (
          <NumOfPosts>
            Number of posts: <strong>{posts?.length}</strong>
          </NumOfPosts>
        )}
        {posts?.map((post) => (
          <Post
            key={post.id}
            name={post.author?.name}
            surname={post.author?.surname}
            description={post.content}
            date={post.createdAt}
            isUpdated={post.createdAt !== post.updatedAt}
          />
        ))}
        {!anyPostAvailable && (
          <NoPosts>
            Today there is no posts to display.{" "}
            <strong>Create your own ones!</strong>
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
  position: realtive;

  overflow: scroll;

  width: 80vw;
  height: 90%;

  margin: 0px 0px 5%;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;

  background: #d9cece;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

export default AllPosts;
