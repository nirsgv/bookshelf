import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Button } from './common';
import { v4 as uuidv4 } from 'uuid';
export default function AddItemButton() {
  const { addBook } = useContext(GlobalContext);

  return (
    <div>
      <Button
        type='button'
        onClick={() =>
          addBook({
            BOOK_ID: uuidv4(),
            PRICE: 'Item Cost',
            WRITTEN_BY: 'Jay Shetty',
            PUBLISHED_BY: 'Andromediy',
            TITLE: 'Item Title',
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
