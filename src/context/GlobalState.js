import React, { createContext, useReducer } from 'react';
import appReducer from './appReducer';
const initialState = {
  books: [],
  booksIds: [],
  stuff: [1, 2, 3],
  isLoginScreen: false,
  user: null,
  isLoggedIn: false,
  userRole: '',
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // actions
  function setBooks(books) {
    dispatch({ type: 'SET_BOOKS', payload: books });
  }
  function removeBook(id) {
    dispatch({ type: 'REMOVE_BOOK', payload: id });
  }

  function toggleLoginScreen() {
    dispatch({ type: 'TOGGLE_LOGIN_SCREEN' });
  }

  function setCurrentUser(user) {
    dispatch({ type: 'SET_CURRENT_USER', payload: user });
  }
  return (
    <GlobalContext.Provider
      value={{
        books: state.books,
        stuff: state.stuff,
        user: state.user,
        isLoginScreen: state.isLoginScreen,
        setBooks,
        removeBook,
        toggleLoginScreen,
        setCurrentUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
