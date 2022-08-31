import React, { useContext, useRef, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";
import styled from "styled-components";
import Title from "../components/Title";
import Image from "../images/ETF_logo.png";
import Button from "../components/Button";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";

const SIGNUP_CLIENT = gql`
  mutation ($createClientInput: CreateClientInput) {
    signUpClient(createClientInput: $createClientInput) {
      name
      surname
      username
      email
      token
    }
  }
`;

const SignUp = (props) => {
  let value = {};

  const name = useRef(null);
  const surname = useRef(null);
  const username = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const context = useContext(authContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [signUpClient, { loading, error, data }] = useMutation(SIGNUP_CLIENT, {
    update: (proxy, { data: { signUpClient: clientData } }) => {
      console.log("data");
      console.log(clientData);
      context.login(clientData);
      navigate("/list-all-clients");
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
  });

  const onClickHandler = () => {
    value = {
      name: name.current.value,
      surname: surname.current.value,
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    signUpClient({
      variables: {
        createClientInput: value,
      },
    });
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("varijabel");
  };

  return (
    <Wrapper>
      <FormWrapper
        onSubmit={() => {
          console.log("aaa");
        }}
      >
        <img src={Image} style={{ width: "50px" }} alt="ETF Logo" />
        <Title>Sign Up</Title>
        <ContentWrapper>
          We suggest using the email you use at work
        </ContentWrapper>
        <InputField
          ref={name}
          placeholder="Name"
          type="text"
          style={{ marginBottom: "15px" }}
        />
        <InputField
          ref={surname}
          placeholder="Surname"
          type="text"
          style={{ marginBottom: "15px" }}
        />
        <InputField
          ref={username}
          placeholder="Username"
          type="text"
          style={{ marginBottom: "15px" }}
        />
        <InputField
          ref={email}
          placeholder="example@exmaple.com"
          type="email"
          style={{ marginBottom: "15px" }}
        />
        <InputField
          ref={password}
          placeholder="Password"
          type="password"
          style={{ marginBottom: "15px" }}
        />
        <Button
          type="submit"
          style={{
            background: "#ff9800",
            color: "#ffffff",
            padding: "5px 90px",
          }}
          onClick={onClickHandler}
        >
          SIGN UP
        </Button>
        <ContentWrapper>
          Already have an account <Link>Sign In</Link>
        </ContentWrapper>
      </FormWrapper>
      {errors.map((error) => {
        return <div>{error.message}</div>;
      })}
    </Wrapper>
  );
};

export default SignUp;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
`;

const ImageWrapper = styled.a`
  text-align: center;
  width: 30px;
  height: 30px;
`;

const ContentWrapper = styled.p`
  text-align: center;
`;

const Link = styled.a`
  color: #2196f3;
  cursor: pointer;
  outline-color: #2196f3;
`;
