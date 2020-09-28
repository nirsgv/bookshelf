import React, { useEffect } from 'react';
import Items from './components/items';
import Search from './components/search';
import Login from './components/login';
import Header from './components/header';

import GlobalStyle from './styles/globalStyle';
import { GlobalProvider } from './context/GlobalState';

export function Main({ children }) {
  return <main>{children}</main>;
}

function App() {
  return (
    <GlobalProvider>
      <div className='App'>
        <GlobalStyle />

        <Header />
        <Search />
        <Main>
          <Items />
          <Login />
        </Main>
      </div>
    </GlobalProvider>
  );
}

export default App;
