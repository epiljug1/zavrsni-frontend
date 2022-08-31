import Post from "../components/Post";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";

import Image from "../images/create.png";

import React, { useContext, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";
import CreatePost from "./CreatePost";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(POSTS);
  const [createPost, setCreatePost] = useState(false);

  const context = useContext(authContext);
  console.log("CONTEXT", context);
  //   console.log("DATA");
  //   console.log(data?.posts);

  const [search, setSearch] = useState("");
  const onChangeHandler = (event) => {
    clearTimeout(debounce);
    var debounce = setTimeout(() => {
      setSearch(event.target.value);
    }, 500);
  };

  const onCreatePostHandler = () => {
    navigate("/create-new-post");
    setCreatePost(true);
  };

  return (
    <>
      <NavBar />
      <SearchFilter>
        <Input type="text" placeholder="Search" onChange={onChangeHandler} />
        {/* <Input style={{ marginLeft: "auto", display: "none" }} type="text" /> */}
        <Button onClick={onCreatePostHandler}>
          <img src={Image} alt="img" style={{ width: "40px" }} />
        </Button>
      </SearchFilter>

      <MainWrapper>
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
