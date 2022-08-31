import NavBar from "../components/NavBar";
import styled from "styled-components";
import Client from "../components/Client";
import React, { useContext } from "react";
import { AuthContext as authContext } from "../context/authContext";

import { gql, useQuery } from "@apollo/client";

const GET_ALL_CLIENTS = gql`
  query {
    clients {
      name
      surname
      username
      email
    }
  }
`;

const ListAllClients = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_CLIENTS);

  const context = useContext(authContext);
  console.log("CONTEXT", context);
  //   console.log(error.message);
  return (
    <>
      <NavBar />
      <MainWrapper>
        {data?.clients?.map((client) => (
          <Client
            name={client.name}
            surname={client.surname}
            username={client.username}
            email={client.email}
          />
        ))}
        <Counter>
          Number of clients: <strong>{data?.clients?.length}</strong>
        </Counter>
      </MainWrapper>
    </>
  );
};

const MainWrapper = styled.div`
  overflow: scroll;

  width: 80vw;
  height: 80vh;

  margin: 6% 5%;
  padding: 0px 14px;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;

  background: #d9cece;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

const Counter = styled.div`
  position: absolute;
  bottom: 8%;
`;

export default ListAllClients;
