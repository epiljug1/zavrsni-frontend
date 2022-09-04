import NavBar from "./components/NavBar";
import SignUp from "./pages/Signup";
import styled from "styled-components";
import Post from "./components/Post";
import React, { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllPosts from "./pages/AllPosts";
import ClientPosts from "./pages/ClientPosts";
import ListAllClients from "./pages/ListAllClients";
import SignIn from "./pages/Signin";
import CreateNewPost from "./pages/CreateNewPost";
import { AuthContext as authContext } from "./context/authContext";

function App() {
  const context = useContext(authContext);
  return (
    <>
      <Content>
        <Routes>
          <Route path="/" element={<AllPosts />} />
          <Route path="/all-posts" element={<AllPosts />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/create-new-post"
            element={context.user ? <CreateNewPost /> : <SignUp />}
          />
          <Route
            path="/personal-posts"
            element={context.user ? <ClientPosts /> : <SignUp />}
          />
          <Route
            path="/list-all-clients"
            element={context.user ? <ListAllClients /> : <SignUp />}
          />
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

export default App;
