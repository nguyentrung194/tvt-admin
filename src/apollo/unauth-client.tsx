import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

import environment from "../config";

const createUnAuthClient = (): ApolloClient<NormalizedCacheObject> => {
  return new ApolloClient({
    link: new HttpLink({
      uri: environment.httpGrapqlUri,
    }),
    cache: new InMemoryCache(),
  });
};

export default createUnAuthClient;
