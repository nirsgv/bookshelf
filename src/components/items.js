import React, { useEffect, useReducer, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GridList, GridItem } from './common';
import Item from './item';
import { getAllItems } from '../helpers';

export default function Items() {
  const { books, setBooks } = useContext(GlobalContext);

  useEffect(() => {
    getAllItems().then((books) => setBooks(books));
  }, []);

  return (
    <div>
      <GridList>
        {books.map((book) => (
          <Item key={book.BOOK_ID} {...book} />
        ))}
      </GridList>
    </div>
  );
}
