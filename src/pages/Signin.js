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

import { validatePassword, validateInput } from "../utils/validateData";
import ValidationError from "../components/ValidationError";
import Errors from "../components/Errors";
import Spinner from "../components/Spinner";

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
  const [loadingSignin, setLoading] = useState(false);

  const username = useRef(null);
  const password = useRef(null);

  const [usernameValidation, setUsernameValidation] = useState();
  const [passwordValidation, setPasswordValidation] = useState();

  const [signInClient, { loading, error, data }] = useMutation(SIGN_IN_CLIENT, {
    update: (proxy, { data: { signInClient: userData } }) => {
      console.log("data: ", userData);
      navigate("/all-posts");
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const value = {
      username: username.current.value,
      password: password.current.value,
    };
    console.log("SIGN IN VALUE: ", value);

    setUsernameValidation(validateInput(value.username, "Username", true));
    setPasswordValidation(validatePassword(value.password));

    signInClient({
      variables: {
        signinInput: value,
      },
    });
  };

  return (
    <>
      {loading && <Spinner />}
      <Wrapper>
        <FormWrapper onSubmit={onSubmitHandler}>
          {/* <ImageWrapper> */}
          <img src={Image} style={{ width: "50px" }} alt="ETF Logo" />
          {/* </ImageWrapper> */}
          <Title>Sign in</Title>
          <ContentWrapper>
            We suggest using the email you use at work
          </ContentWrapper>
          <InputField
            ref={username}
            placeholder="Enter username"
            type="text"
            style={{ marginBottom: "15px" }}
          />
          {usernameValidation && (
            <ValidationError>{usernameValidation}</ValidationError>
          )}
          <InputField
            ref={password}
            placeholder="Enter password"
            type="password"
            style={{ marginBottom: "15px" }}
          />
          {passwordValidation && (
            <ValidationError>{passwordValidation}</ValidationError>
          )}
          <Button
            style={{
              background: "#ff9800",
              color: "#ffffff",
              padding: "5px 90px",
            }}
          >
            SIGN IN
          </Button>
          <ContentWrapper>
            Don't have an account{" "}
            <LinkNavigate to="/signup">Sign up</LinkNavigate>
          </ContentWrapper>
          {errors.map((error) => {
            return (
              <Errors>
                {error.message}
                {error.message.includes("username") && (
                  <strong>{username.current.value}</strong>
                )}
              </Errors>
            );
          })}
        </FormWrapper>
      </Wrapper>
    </>
  );
};

const LinkNavigate = styled(Link)`
  text-decoration: none;
  color: #2196f3;
  cursor: pointer;
  outline-color: #2196f3;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  text-align: center;
  padding-top: 5rem;
`;

const FormWrapper = styled.form`
  width: 20%;
  height: auto;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 20px;
  text-align: center;
  padding: 60px 100px;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.99);
`;

const InputField = styled.input`
  border: 1px solid;
  border-radius: 15px;
  line-height: 1.15;
  font-size: 1.1rem;
  padding: 5px 15px;
  border-color: 1px solid #c6d2d9;
  font-family: inherit;

  // width: 90%;
  margin-left: auto;
  margin-right: auto;
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
