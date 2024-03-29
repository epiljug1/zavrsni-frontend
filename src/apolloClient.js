import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
// const httpLink = createHttpLink({
//   uri: "http://localhost:4000/",
// });

const httpLink = createHttpLink({
  // uri: process.env.PORT || "http://localhost:4000/",
  uri: "https://evegram-etf-backend.onrender.com/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  name: "web",
  version: "1.0",
});

export default client;
