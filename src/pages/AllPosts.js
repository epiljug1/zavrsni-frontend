import Post from "../components/Post";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import NumOfPosts from "../components/NumOfPosts";

const POSTS = gql`
  query {
    posts {
      content
      createdAt
      author {
        name
        surname
        username
      }
    }
  }
`;

const AllPosts = (props) => {
  const { loading, error, data, refetch } = useQuery(POSTS);

  const [search, setSearch] = useState("");
  const onChangeHandler = (event) => {
    clearTimeout(debounce);
    var debounce = setTimeout(() => {
      setSearch(event.target.value);
    }, 500);
  };

  useEffect(() => {
    refetch();
    console.log("refetch");
  });

  const anyPostAvailable = data?.posts.length > 0;

  return (
    <>
      <NavBar />
      <SearchFilter>
        <Input type="text" placeholder="Search" onChange={onChangeHandler} />
      </SearchFilter>
      {loading && <Spinner />}
      <MainWrapper>
        {anyPostAvailable && (
          <NumOfPosts>Number of posts: {data?.posts.length}</NumOfPosts>
        )}
        {data?.posts
          .filter((post) => post.content.includes(search))
          .map((post) => (
            <Post
              key={post.id}
              name={post.author.name}
              surname={post.author.surname}
              description={post.content}
              date={post.createdAt}
            />
          ))}
      </MainWrapper>
    </>
  );
};

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
