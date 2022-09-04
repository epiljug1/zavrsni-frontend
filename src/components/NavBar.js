import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useContext } from "react";
import { AuthContext as authContext } from "../context/authContext";

const NavBar = (props) => {
  const context = useContext(authContext);
  // console.log("NAVBAR: ", context.user);
  const navigate = useNavigate();

  const onSignOutHandler = () => {
    context.logout();
  };

  return (
    <NavWrapper>
      <span>
        <LinkStyle to="/all-posts">All Posts</LinkStyle>
        {context.user && <LinkStyle to="/personal-posts">Your Posts</LinkStyle>}
        {context.user && <LinkStyle to="/list-all-clients">Users</LinkStyle>}
      </span>
      <NavPart>
        {context.user && (
          <LinkStyle to="/signup" onClick={onSignOutHandler}>
            Logout
          </LinkStyle>
        )}
        {context.user && <LinkStyle to="/">Edit profile</LinkStyle>}
        {context.user && <LinkStyle to="/">{context.user.username}</LinkStyle>}
        {!context.user && <LinkStyle to="/signup">Sign up</LinkStyle>}
        {!context.user && <LinkStyle to="/signin">Sign in</LinkStyle>}
      </NavPart>
    </NavWrapper>
  );
};

const NavPart = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LinkStyle = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  padding: 10px 5px;
  margin: 0px 20px;
  font-size: 1.25rem;

  &:hover {
    color: #b392ee;
    scale: 1.1;
    // font-weight: bold;
  }
  &:focus {
    /* text-decoration: underline; */
    border: 2px solid black;
    border-radius: 10px;
    font-weight: bold;
  }
`;

const NavWrapper = styled.div`
  background: #343a40;
  padding: 2px 12px;
  color: #ffffff;
  width: 100%;
  position: fixed;
  z-index: 2;
  height: 3.5rem;
  box-shadow: 0 7px 12px 0 rgba(0, 0, 0, 0.2);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default NavBar;
