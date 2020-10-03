import React, { useEffect, useState, useContext } from 'react';
import SearchInput from './searchInput';
import { GlobalContext } from '../context/GlobalState';
import { SearchSection } from './common';
import { getAllItems } from '../helpers';
export default function Search() {
  const { setBooks } = useContext(GlobalContext);
  const [searchVal, setSearchVal] = useState('');
  useEffect(() => {
    searchVal.length
      ? searchItems(searchVal)
      : getAllItems().then((data) => setBooks(data));
  }, [searchVal]);

  const searchItems = (txt) => {
    return fetch(window.location.origin + '/api/bookbytitle/' + txt)
      .then((response) => response.json())
      .then((data) => setBooks(data));
  };

  return (
    <SearchSection>
      <SearchInput setSearchVal={setSearchVal} />
    </SearchSection>
  );
}
