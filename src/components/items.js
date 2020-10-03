import React, { useEffect, useReducer, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GridList } from './common';
import Item from './item';
import { getAllItems } from '../helpers';
import AddItemButton from './addItemButton';

export default function Items() {
  const { books, setBooks, user } = useContext(GlobalContext);

  useEffect(() => {
    getAllItems().then((books) => setBooks(books));
  }, []);

  return (
    <div>
      <GridList>
        {books.map((book) => (
          <Item key={book.BOOK_ID} {...book} />
        ))}
        {user && user.ROLE === 'Admin' ? <AddItemButton /> : null}
      </GridList>
    </div>
  );
}
