export default function editedItemReducer(state, action) {
  switch (action.type) {
    case 'SET_BOOK_ID':
      return { ...state, BOOK_ID: action.payload };
    case 'SET_BOOK_PRICE':
      return { ...state, PRICE: action.payload };
    case 'SET_BOOK_WRITER':
      return { ...state, WRITTEN_BY: action.payload };
    case 'SET_BOOK_PUBLISHER':
      return { ...state, PUBLISHED_BY: action.payload };
    case 'SET_BOOK_TITLE':
      return { ...state, TITLE: action.payload };
    case 'SET_BEING_INIT':
      return { ...state, beingInit: false };
    default:
      throw new Error();
  }
}
