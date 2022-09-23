import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getJwtToken } from "./hooks/useJwtToken";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_API_URL}/v4/gql`,
});

const authLink = setContext((_, { headers }) => {
  const token = getJwtToken();
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
});

export default client;
