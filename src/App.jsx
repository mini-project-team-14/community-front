import React from 'react'
import Router from './shared/Router'
import { QueryClient, QueryClientProvider } from 'react-query'
import "./App.css";
import GlobalStyle from './styles/GlobalStyle';
import { useCookies } from 'react-cookie';
import CategoryContext from './assets/context/CategoryContext';

const queryClient = new QueryClient();

const categoryData = [
  { boardId: 1, name: "자유게시판", path: "free"},
  { boardId: 2, name: "SPRING", path: "spring" },
  { boardId: 3, name: "REACT", path: "react" }
];

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  return (
    <>
      <GlobalStyle />
      <CategoryContext.Provider value={categoryData}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </CategoryContext.Provider>
    </>
  )
}

export default App