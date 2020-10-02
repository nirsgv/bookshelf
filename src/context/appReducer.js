export default (state, action) => {
  switch (action.type) {
    case 'SET_BOOKS':
      return {
        ...state,
        books: action.payload,
      };
    case 'REMOVE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.BOOK_ID !== action.payload),
      };
    case 'TOGGLE_LOGIN_SCREEN':
      return {
        ...state,
        isLoginScreen: !state.isLoginScreen,
      };
    case 'SET_CURRENT_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_USER_PURCHASES':
      return {
        ...state,
        user: {
          ...state.user,
          PURCHASED_BOOKS: action.payload,
        },
      };

    default:
      return state;
  }
};
