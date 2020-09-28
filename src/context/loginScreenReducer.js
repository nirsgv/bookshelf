export default function loginScreenReducer(state, action) {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, EMAIL: action.payload };
    case 'SET_PASSWORD':
      return { ...state, PASSWORD: action.payload };

    default:
      throw new Error();
  }
}
