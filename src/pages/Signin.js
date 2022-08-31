import React, { useContext, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";
import styled from "styled-components";
import Button from "../components/Button";
import Title from "../components/Title";

import Image from "../images/ETF_logo.png";

import { gql, useMutation } from "@apollo/client";
import { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const SIGN_IN_CLIENT = gql`
  mutation ($signinInput: SigninInput) {
    signInClient(signinInput: $signinInput) {
      name
      surname
      username
      email
      token
    }
  }
`;

const SignIn = (props) => {
  const navigate = useNavigate();
  const context = useContext(authContext);
  const [errors, setErrors] = useState([]);

  const email = useRef(null);
  const password = useRef(null);

  const [signInClient, { loading, error, data }] = useMutation(SIGN_IN_CLIENT, {
    update: (proxy, { data: { signInClient: userData } }) => {
      console.log("data: " + userData);

      context.login(userData);
      navigate("/all-posts");
      // navigate("/signin");
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
  });
  console.log("error: " + error);
  console.log("loading: " + loading);

  const onSignInHandler = () => {
    const value = {
      username: email.current.value,
      password: password.current.value,
    };
    console.log("SIGN IN VALUE: ", value);

    signInClient({
      variables: {
        signinInput: value,
      },
    });
  };

  return (
    <Wrapper>
      <FormWrapper>
        {/* <ImageWrapper> */}
        <img src={Image} style={{ width: "50px" }} alt="ETF Logo" />
        {/* </ImageWrapper> */}
        <Title>Sign in</Title>
        <ContentWrapper>
          We suggest using the email you use at work
        </ContentWrapper>
        <InputField
          ref={email}
          placeholder="Enter email"
          type="email"
          style={{ marginBottom: "15px" }}
        />
        <InputField
          ref={password}
          placeholder="Enter password"
          type="password"
          style={{ marginBottom: "15px" }}
        />
        <Button
          style={{
            background: "#ff9800",
            color: "#ffffff",
            padding: "5px 90px",
          }}
          onClick={onSignInHandler}
        >
          SIGN IN
        </Button>
        <ContentWrapper>
          Don't have an account{" "}
          <LinkNavigate to="/signup">Sign up</LinkNavigate>
        </ContentWrapper>
      </FormWrapper>
      {errors.map((error) => {
        return <div>{error.message}</div>;
      })}
    </Wrapper>
  );
};

const LinkNavigate = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  text-align: center;
  padding-top: 5rem;
`;

const FormWrapper = styled.div`
  width: 20%;
  height: auto;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 20px;
  text-align: center;
  padding: 60px 100px;
`;

const InputField = styled.input`
  border: 1px solid;
  border-radius: 15px;
  line-height: 1.15;
  font-size: 1.1rem;
  padding: 5px 15px;
  border-color: 1px solid #c6d2d9;
  font-family: inherit;
`;

const ImageWrapper = styled.a`
  text-align: center;
  width: 30px;
  height: 30px;
`;

const ContentWrapper = styled.p`
  text-align: center;
`;

const LinkTag = styled.a`
  color: #2196f3;
  cursor: pointer;
  outline-color: #2196f3;
`;

// const Button = styled.button`
//   border: 1px solid;
//   border-radius: 15px;
//   font-size: 1.1rem;
//   padding: 5px 15px;
//   background: #ff9800;
//   color: #ffffff;
//   cursor: pointer;
// `;

export default SignIn;
