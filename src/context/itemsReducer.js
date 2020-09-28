export default function itemsReducer(state, action) {
  switch (action.type) {
    case 'setBooks':
      return { ...state, books: action.payload };
    case 'setBooksIds':
      return { ...state, booksIds: action.payload };

    default:
      throw new Error();
  }
}
