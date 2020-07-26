import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient, ApolloProvider, HttpLink, ApolloLink, concat, InMemoryCache } from '@apollo/client'
import * as serviceWorker from './serviceWorker'
import Router from './router'
import 'semantic-ui-css/semantic.min.css'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      'x-token': localStorage.getItem('token'),
      'x-refresh-token': localStorage.getItem('refreshToken'),
    },
  }))

  return forward(operation).map(response => {
    const { response: { headers } } = operation.getContext()

    if (Object.keys(headers).length) {
      const token = headers.get('x-token')
      const refreshToken = headers.get('x-refresh-token')

      if (token) localStorage.setItem('token', token)
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken)
    }

    return response
  })
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
})

const App = () => (
  <ApolloProvider client={client}>
    <Router />
  </ApolloProvider>
)

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
