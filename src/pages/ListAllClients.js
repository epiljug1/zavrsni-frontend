import NavBar from "../components/NavBar";
import styled from "styled-components";
import Client from "../components/Client";
import React, { useContext, useEffect } from "react";
import { AuthContext as authContext } from "../context/authContext";

import { gql, useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";

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
  const { loading, error, data, refetch } = useQuery(GET_ALL_CLIENTS);

  const context = useContext(authContext);
  // console.log("CONTEXT", context);
  //   console.log(error.message);

  useEffect(() => {
    refetch();
  });
  return (
    <>
      <NavBar />
      {loading && <Spinner />}
      <MainWrapper>
        <NumOfPosts>Number of clients: {data?.clients?.length}</NumOfPosts>
        {data?.clients?.map((client) => (
          <Client
            name={client.name}
            surname={client.surname}
            username={client.username}
            email={client.email}
          />
        ))}
      </MainWrapper>
    </>
  );
};

const NumOfPosts = styled.div`
  color: rgba(0, 0, 0, 0.9);
  position: absolute;
  top: 5px;
  //   left: 30px;

  width: fit-content;
  margin: 10px auto;
`;

const MainWrapper = styled.div`
  overflow: scroll;

  min-width: 80vw;
  min-height: 80vh;

  margin: 6% 5%;
  padding: 20px 14px;

  box-shadow: 0px 2px 16px hsl(260deg 50% 10% / 0.9);
  border-radius: 10px;

  position: relative;

  background: #d9cece;

  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  @media (max-width: 700px) {
    margin: 13% 5%;
  }
`;

export default ListAllClients;
