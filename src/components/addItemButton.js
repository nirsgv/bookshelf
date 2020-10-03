import React, { useEffect, useReducer, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Button } from './common';
export default function AddItemButton() {
  const { books, setBooks, user, addBook } = useContext(GlobalContext);

  return (
    <div>
      <Button
        type='button'
        onClick={() =>
          addBook({
            BOOK_ID: '2354345g-r34636-40d5-a44b-c0d6c7ad02fe',
            PRICE: 19,
            WRITTEN_BY: 'Jay Shetty',
            PUBLISHED_BY: 'Andromediy',
            TITLE: 'Think Like a Monk: Train Your Mind for Peace',
            BEING_INIT: true,
            __v: 0,
          })
        }
      >
        +
      </Button>
    </div>
  );
}
