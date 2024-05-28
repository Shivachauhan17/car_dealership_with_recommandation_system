import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux"
import {configureStore} from '@reduxjs/toolkit'
import { setContext } from '@apollo/client/link/context'
import loginRegisterReducer from './store/authForms/loginRegisterReducer'
import homeReducer from './store/homePage/homeReducer'
import inventoryReducer from './store/inventory/inventoryReducer'
import App from './App'
import './index.css'

import { ApolloClient, InMemoryCache, ApolloProvider,createHttpLink  } from '@apollo/client'


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const store=configureStore({
  reducer:{
    form:loginRegisterReducer,
    home:homeReducer,
    inventory:inventoryReducer
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)