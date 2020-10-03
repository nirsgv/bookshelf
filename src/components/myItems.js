import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MyItemsWrap, MyItemsItem } from './common/styledComponents';
import { getBookById } from '../helpers';

function BookCard({ PUBLISHED_BY, TITLE, WRITTEN_BY }) {
  return (
    <MyItemsItem>
      <h3>{PUBLISHED_BY}</h3>
      <h3>{TITLE}</h3>
      <h3>{WRITTEN_BY}</h3>
    </MyItemsItem>
  );
}

function Book(book) {
  const [bookItem, setBookItem] = useState({});
  useEffect(() => {
    getBookById(book.bookId).then((par) => setBookItem(par));
  }, []);
  if (!bookItem) return null;
  return <BookCard {...bookItem} />;
}

export default function MyItems() {
  const { user } = useContext(GlobalContext);

  if (user && user.ROLE === 'User' && user.PURCHASED_BOOKS) {
    return (
      <MyItemsWrap>
        {user.PURCHASED_BOOKS.map((book, index) => (
          <Book key={index} bookId={book} />
        ))}
      </MyItemsWrap>
    );
  } else {
    return null;
  }
}
