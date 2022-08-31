import Post from "../components/Post";
import styled from "styled-components";
import { gql, useQuery } from "@apollo/client";
import NavBar from "../components/NavBar";
import React, { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

const CLIENT_POSTS = gql`
  query ($getClientPostsId: String!) {
    getClientPosts(email: $getClientPostsId) {
      content
      createdAt
      author {
        name
        surname
      }
    }
  }
`;

const ClientPosts = (props) => {
  const context = useContext(AuthContext);
  const [search, setSearch] = useState("");

  console.log("MAIL: " + context.user.email);
  const { loading, error, data } = useQuery(CLIENT_POSTS, {
    variables: {
      getClientPostsId: context.user.email,
    },
  });
  console.log("DATA");
  console.log(data?.getClientPosts);
  return (
    <>
      <NavBar />
      <SearchFilter>
        <Input type="text" placeholder="Search" />
        <Input style={{ marginLeft: "auto" }} type="text" />
      </SearchFilter>
      <MainWrapper>
        {data?.getClientPosts
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
  overflow: scroll;

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
