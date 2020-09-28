import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MyItemsWrap } from './common/styledComponents';
// import { getBookById } from '../helpers';

export const getBookById = (bookId) => {
  return fetch(window.location.origin + '/api/bookbyid/' + bookId)
    .then((response) => response.json())
    .then((book) => {
      console.log('ret', book[0]);
      return book[0];
    });
};

export function Book(book) {
  const [bookItem, setBookItem] = useState({});
  useEffect(() => {
    console.log(book);
    getBookById(book.bookId).then((par) => {
      console.log('returned', par, arguments);
      setBookItem(par);
    });
  }, []);
  return <div>something</div>;
}

export default function MyItems() {
  const { user } = useContext(GlobalContext);

  // useEffect(() => {}, []);

  if (!user || !user.PURCHASED_BOOKS) return null;

  return (
    <MyItemsWrap>
      {user.PURCHASED_BOOKS.map((book) => (
        <Book key={book} bookId={book} />
      ))}
    </MyItemsWrap>
  );
}
