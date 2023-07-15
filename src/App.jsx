import React from 'react'
import Router from './shared/Router'
import { QueryClient, QueryClientProvider } from 'react-query'
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App