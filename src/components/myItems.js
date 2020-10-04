import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { MyItemsWrap, MyItemsBook, Button } from './common/styledComponents';
import { getBookById, removePurchase } from '../helpers';

function BookCard({ TITLE, WRITTEN_BY, BOOK_ID }) {
  const { setUserPurchases, user } = useContext(GlobalContext);

  return (
    <MyItemsBook>
      <Button
        onClick={() =>
          removePurchase({
            bookId: BOOK_ID,
            userId: user.USER_ID,
            purchased: user.PURCHASED_BOOKS,
            token: user.TOKEN,
          }).then((data) => {
            console.log(data.returnPurchased);
            setUserPurchases(data.returnPurchased);
          })
        }
      >
        x
      </Button>
      <h3>{TITLE}</h3>
      <h3>{WRITTEN_BY}</h3>
    </MyItemsBook>
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
        <h3>My Purchases:</h3>
        <div className='items'>
          {user.PURCHASED_BOOKS.map((book, index) => (
            <Book key={book} bookId={book} />
          ))}
        </div>
      </MyItemsWrap>
    );
  } else {
    return null;
  }
}
