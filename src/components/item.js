import React, { useReducer, useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';

import { GridItem } from './common';
import editedItemReducer from '../context/editedItemReducer';
import { removeItemRemote, editItemRemote, purchaseItem } from '../helpers';

export function ItemEdit({ BOOK_ID, PRICE, WRITTEN_BY, PUBLISHED_BY, TITLE }) {
  const { setBooks, user } = useContext(GlobalContext);
  const token = user ? user.TOKEN : '';

  const [state, dispatch] = useReducer(editedItemReducer, {
    BOOK_ID,
    PRICE,
    WRITTEN_BY,
    PUBLISHED_BY,
    TITLE,
  });

  return (
    <>
      <h2>
        <input
          type='text'
          placeholder={TITLE}
          value={state.TITLE}
          onChange={(e) =>
            dispatch({ type: 'SET_BOOK_TITLE', payload: e.target.value })
          }
        />
      </h2>
      <h4>
        <input
          type='text'
          placeholder={WRITTEN_BY}
          value={state.WRITTEN_BY}
          onChange={(e) =>
            dispatch({ type: 'SET_BOOK_WRITER', payload: e.target.value })
          }
        />
      </h4>
      <h6>
        <input
          type='text'
          placeholder={PUBLISHED_BY}
          value={state.PUBLISHED_BY}
          onChange={(e) =>
            dispatch({ type: 'SET_BOOK_PUBLISHER', payload: e.target.value })
          }
        />
      </h6>
      <h2>
        <input
          type='text'
          placeholder={PRICE}
          value={state.PRICE}
          onChange={(e) =>
            dispatch({ type: 'SET_BOOK_PRICE', payload: e.target.value })
          }
        />
      </h2>
      <button
        type='button'
        onClick={() =>
          editItemRemote(
            {
              BOOK_ID,
              TITLE: state.TITLE,
              WRITTEN_BY: state.WRITTEN_BY,
              PUBLISHED_BY: state.PUBLISHED_BY,
              PRICE: state.PRICE,
              token,
            },
            setBooks
          ).then((data) => setBooks(data))
        }
      >
        Submit!
      </button>
    </>
  );
}

export function ItemDisplay({
  BOOK_ID,
  PRICE,
  WRITTEN_BY,
  PUBLISHED_BY,
  TITLE,
}) {
  return (
    <>
      <h2>
        <span>{TITLE}</span>
      </h2>
      <h4>
        <span>{WRITTEN_BY}</span>
      </h4>
      <h6>
        <span>{PUBLISHED_BY}</span>
      </h6>
      <h2>
        <span>${PRICE}</span>
      </h2>
    </>
  );
}

export default function Item(props) {
  const [isEditMode, setEditMode] = useState(false);
  const { removeBook, setBooks, user } = useContext(GlobalContext);
  const token = user ? user.TOKEN : '';

  return (
    <GridItem>
      {!isEditMode ? <ItemDisplay {...props} /> : <ItemEdit {...props} />}

      {user && user.ROLE === 'User' && (
        <button
          type='button'
          onClick={() =>
            purchaseItem({
              bookId: props.BOOK_ID,
              userId: user.USER_ID,
              token,
            }).then((data) => console(data))
          }
        >
          Purchase
        </button>
      )}
      {user && user.ROLE === 'Admin' && (
        <>
          <button type='button' onClick={() => setEditMode(!isEditMode)}>
            Edit
          </button>
          <button
            type='button'
            onClick={() =>
              removeItemRemote({ id: props.BOOK_ID, token }).then((data) =>
                setBooks(data)
              )
            }
          >
            Delete
          </button>
        </>
      )}
    </GridItem>
  );
}
