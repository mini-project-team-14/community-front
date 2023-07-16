import React from 'react'
import Router from './shared/Router'
import { QueryClient, QueryClientProvider } from 'react-query'
import "./App.css";
import GlobalStyle from './styles/GlobalStyle';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </>
  )
}

export default App