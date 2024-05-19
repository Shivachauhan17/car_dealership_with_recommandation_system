import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux"
import {configureStore} from '@reduxjs/toolkit'
import loginRegisterReducer from './store/authForms/loginRegisterReducer'
import App from './App'
import './index.css'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const store=configureStore({
  reducer:{
    form:loginRegisterReducer
  }
})


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>
)