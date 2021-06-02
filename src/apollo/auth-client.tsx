import { ApolloClient, split, HttpLink, InMemoryCache } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { onError } from '@apollo/client/link/error'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'
import { SubscriptionClient } from 'subscriptions-transport-ws'

import environment from '../config'

const createAuthApolloClient = (user: any) => {
  const authLink = setContext(async (_, { headers }) => {
    const token: string = await user.getIdToken()
    return {
      headers: {
        ...headers,
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  })

  const httpLink = new HttpLink({
    uri: environment.httpGrapqlUri,
  })

  const websocket = new SubscriptionClient(environment.wsGrapqlUri, {
    reconnect: true,
    connectionParams: async () => {
      const token: string = await user.getIdToken()
      return {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
        },
      }
    },
  })

  const wsLink = new WebSocketLink(websocket)
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      // eslint-disable-next-line array-callback-return
      graphQLErrors.map(({ message, extensions }: any) => {
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${extensions.code}`
        )
        // window.location.replace('/network-error')
      })

    if (networkError) {
      console.log(`[Network error]: ${networkError}`)
      // window.location.replace('/network-error') // redirect to network-error route
    }
  })

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      )
    },
    wsLink,
    errorLink.concat(authLink.concat(httpLink))
  )

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  })
}

export default createAuthApolloClient
