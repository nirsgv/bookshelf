import React, { useEffect, useReducer, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GridList, GridItem } from './common';

export default function Header() {
  const { isLoginScreen, toggleLoginScreen, user, setCurrentUser } = useContext(
    GlobalContext
  );

  return (
    <header className='App-header'>
      <div>Bookshelf logo</div>
      <button
        type='button'
        onClick={(e) => (!user ? toggleLoginScreen(e) : setCurrentUser(null))}
      >
        {user ? 'logout' : 'login'}
      </button>
      <div>{user ? 'Logout' : 'Login'}</div>
    </header>
  );
}
