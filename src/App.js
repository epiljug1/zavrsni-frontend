import NavBar from "./components/NavBar";
import SignUp from "./pages/Signup";
import styled from "styled-components";
import Post from "./components/Post";
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import ClientPosts from "./pages/ClientPosts";
import ListAllClients from "./pages/ListAllClients";
import SignIn from "./pages/Signin";
import CreateNewPost from "./pages/CreateNewPost";

function App() {
  return (
    <>
      <Content>
        <Routes>
          <Route path="/create-new-post" element={<CreateNewPost />} />
          <Route path="/" element={<AllPosts />} />
          <Route path="/personal-posts" element={<ClientPosts />} />
          <Route path="/list-all-clients" element={<ListAllClients />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Content>
    </>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  jusitfy-content: center;
  align-items: center;
`;

// overflow-x: hidden;
// overflow-y: hidden;

/*
background: rgb(2, 0, 36);
  background: linear-gradient(
    180.72deg,
    rgba(2, 0, 36, 1) 4%,
    rgba(85, 28, 89, 1) 40%,
    rgba(20, 124, 145, 0.9279061966583508) 140%
  );
*/

export default App;
