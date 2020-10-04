import React, { useReducer, useContext, useState, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { GridItem, Button } from './common/styledComponents';
import editedItemReducer from '../context/editedItemReducer';
import { SelectPublisher, SelectWriter } from './select';

import {
  removeItemRemote,
  editItemRemote,
  purchaseItem,
  addBookRemote,
  getPublisher,
  getWriter,
} from '../helpers';

export function ItemEdit({
  BOOK_ID,
  PRICE,
  WRITTEN_BY,
  PUBLISHED_BY,
  TITLE,
  setEditMode,
  BEING_INIT,
}) {
  const { setBooks, user } = useContext(GlobalContext);
  const token = user ? user.TOKEN : '';

  const [state, dispatch] = useReducer(editedItemReducer, {
    BOOK_ID,
    PRICE,
    WRITTEN_BY,
    PUBLISHED_BY,
    TITLE,
    BEING_INIT,
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

      <SelectWriter
        selectCb={(e) =>
          dispatch({ type: 'SET_BOOK_WRITER', payload: e.target.value })
        }
      />

      <SelectPublisher
        selectCb={(e) =>
          dispatch({ type: 'SET_BOOK_PUBLISHER', payload: e.target.value })
        }
      />

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
      <Button
        type='button'
        onClick={() =>
          !BEING_INIT
            ? editItemRemote({
                BOOK_ID,
                TITLE: state.TITLE,
                WRITTEN_BY: state.WRITTEN_BY,
                PUBLISHED_BY: state.PUBLISHED_BY,
                PRICE: state.PRICE,
                token,
              }).then((data) => {
                setBooks(data);
                setEditMode(false);
              })
            : addBookRemote({
                TITLE: state.TITLE,
                WRITTEN_BY: state.WRITTEN_BY,
                PUBLISHED_BY: state.PUBLISHED_BY,
                PRICE: state.PRICE,
                token,
              }).then((data) => {
                setBooks(data);
                setEditMode(false);
              })
        }
      >
        Submit!
      </Button>
    </>
  );
}

export function ItemDisplay({ PRICE, WRITTEN_BY, PUBLISHED_BY, TITLE }) {
  const [publisher, setPublisher] = useState('');
  const [writer, setWriter] = useState('');

  useEffect(() => {
    getPublisher(PUBLISHED_BY).then((response) =>
      setPublisher(response.result)
    );
    getWriter(WRITTEN_BY).then((response) => setWriter(response.result));
  }, []);
  return (
    <>
      <h2>
        <span>{TITLE}</span>
      </h2>
      <h4>
        <span>{writer && writer.WRITER_NAME}</span>
      </h4>
      <h6>
        <span>{publisher && publisher.PUBLISHER_NAME}</span>
      </h6>
      <h2>
        <span>${PRICE}</span>
      </h2>
    </>
  );
}

export default function Item(props) {
  const [isEditMode, setEditMode] = useState(false);

  const { setUserPurchases, setBooks, user } = useContext(GlobalContext);
  const token = user ? user.TOKEN : '';
  useEffect(() => {
    if (props.BEING_INIT) {
      setEditMode(true);
    }
  }, []);
  const isOwned = user && user.PURCHASED_BOOKS.includes(props.BOOK_ID);
  return (
    <GridItem>
      {!isEditMode ? (
        <ItemDisplay {...props} />
      ) : (
        <ItemEdit {...props} setEditMode={setEditMode} />
      )}

      {user && user.ROLE === 'User' && (
        <Button
          type='button'
          disabled={isOwned}
          onClick={() =>
            purchaseItem({
              bookId: props.BOOK_ID,
              userId: user.USER_ID,
              purchased: user.PURCHASED_BOOKS,
              token,
            }).then((data) => setUserPurchases(data.returnPurchased))
          }
        >
          {!isOwned ? 'Purchase' : 'Purchased...'}
        </Button>
      )}
      {user && user.ROLE === 'Admin' && !isEditMode && (
        <>
          <Button type='button' onClick={() => setEditMode(!isEditMode)}>
            Edit
          </Button>
          <Button
            type='button'
            onClick={() =>
              removeItemRemote({ id: props.BOOK_ID, token }).then((data) =>
                setBooks(data)
              )
            }
          >
            Delete
          </Button>
        </>
      )}
    </GridItem>
  );
}
