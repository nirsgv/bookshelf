import React, { useEffect } from 'react';
import Items from './components/items';
import Search from './components/search';

import GlobalStyle from './styles/globalStyle';
import { GlobalProvider } from './context/GlobalState';
export function Login() {
  return <div></div>;
}

export function Main({ children }) {
  return <main>{children}</main>;
}

export function Header() {
  return (
    <header className='App-header'>
      <div>Bookshelf logo</div>
    </header>
  );
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
