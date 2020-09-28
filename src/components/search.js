import React, { useEffect, useState, useContext } from 'react';
import SearchInput from './searchInput';
import { GlobalContext } from '../context/GlobalState';
import { SearchSection } from './common';

export default function Search() {
  const { setBooks } = useContext(GlobalContext);
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    searchVal.length && searchItems(searchVal);
  }, [searchVal]);

  const searchItems = async (txt) => {
    // await dispatch({ type: 'setLoader', payload: true });
    await fetch(window.location.origin + '/api/bookbytitle/' + txt)
      .then((response) => response.json())
      .then((data) => setBooks(data));
    // dispatch({ type: 'setLoader', payload: false });
  };

  return (
    <SearchSection>
      <SearchInput setSearchVal={setSearchVal} />
    </SearchSection>
  );
}
