import React, { useContext, useRef, useState } from "react";
import { AuthContext as authContext } from "../context/authContext";
import styled from "styled-components";
import Title from "../components/Title";
import Image from "../images/logo2.jpg";
import Button from "../components/Button";
import { gql, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import {
  validateEmail,
  validatePassword,
  validateInput,
} from "../utils/validateData";
import Errors from "../components/Errors";

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

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameValidation, setNameValidation] = useState();
  const [surnameValidation, setSurnameValidation] = useState();
  const [usernameValidation, setUsernameValidation] = useState();
  const [emailValidation, setEmailValidation] = useState();
  const [passwordValidation, setPasswordValidation] = useState();

  const context = useContext(authContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const [signUpClient, { loading, error, data }] = useMutation(SIGNUP_CLIENT, {
    update: (proxy, { data: { signUpClient: clientData } }) => {
      context.login(clientData);
      navigate("/list-all-clients");
    },
    onError: ({ graphQLErrors }) => {
      setErrors(graphQLErrors);
    },
  });

  const onSubmitHandler = (event) => {
    event.preventDefault();
    value = {
      name,
      surname,
      username,
      email,
      password,
    };
    setNameValidation(validateInput(name, "Name"));
    setSurnameValidation(validateInput(surname, "Surname"));
    setUsernameValidation(validateInput(username, "Username"));
    setEmailValidation(validateEmail(email));
    setPasswordValidation(validatePassword(password));
    if (
      emailValidation &&
      !nameValidation &&
      !surnameValidation &&
      !usernameValidation &&
      !passwordValidation
    ) {
      signUpClient({
        variables: {
          createClientInput: value,
        },
      });
    }
  };
  const onNameChange = (e) => {
    const name = e.target.value.trim();
    setName(name);
  };
  return (
    <Wrapper>
      <FormWrapper onSubmit={onSubmitHandler}>
        <img src={Image} style={{ width: "85px" }} alt="ETF Logo" />
        <Title>Sign Up</Title>
        <ContentWrapper>Input your info</ContentWrapper>
        <InputField
          value={name}
          onChange={onNameChange}
          placeholder="Name"
          type="text"
          style={{ marginBottom: "15px" }}
        />
        {nameValidation && <ValidationError>{nameValidation}</ValidationError>}
        <InputField
          value={surname}
          onChange={(e) => setSurname(e.target.value.trim())}
          placeholder="Surname"
          type="text"
          style={{ marginBottom: "15px" }}
        />
        {surnameValidation && (
          <ValidationError>{surnameValidation}</ValidationError>
        )}
        <InputField
          value={username}
          onChange={(e) => setUsername(e.target.value.trim())}
          placeholder="Username"
          type="text"
          style={{ marginBottom: "15px" }}
        />
        {usernameValidation && (
          <ValidationError>{usernameValidation}</ValidationError>
        )}
        <InputField
          value={email}
          onChange={(e) => setEmail(e.target.value.trim())}
          placeholder="example@exmaple.com"
          type="email"
          style={{ marginBottom: "15px" }}
        />
        {emailValidation && (
          <ValidationError>{emailValidation}</ValidationError>
        )}
        <InputField
          value={password}
          onChange={(e) => setPassword(e.target.value.trim())}
          placeholder="Password"
          type="password"
          style={{ marginBottom: "15px" }}
        />
        {passwordValidation && (
          <ValidationError>{passwordValidation}</ValidationError>
        )}
        <Button
          type="submit"
          style={{
            background: "#ff9800",
            color: "#ffffff",
            padding: "5px 90px",
          }}
        >
          SIGN UP
        </Button>
        <ContentWrapper>
          Already have an account{" "}
          <LinkNavigate to="/signin">Sign in</LinkNavigate>
        </ContentWrapper>
        {errors.map((error) => {
          return <Errors>{error.message}</Errors>;
        })}
      </FormWrapper>
    </Wrapper>
  );
};

const ValidationError = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: -10px;
`;

const LinkNavigate = styled(Link)`
  text-decoration: none;
  color: #2196f3;
  cursor: pointer;
  outline-color: #2196f3;
`;
export default SignUp;

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
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
`;

const ImageWrapper = styled.a`
  text-align: center;
  width: 30px;
  height: 30px;
`;

const ContentWrapper = styled.p`
  text-align: center;
`;
