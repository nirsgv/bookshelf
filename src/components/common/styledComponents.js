import styled, { css } from 'styled-components';

const GridList = styled.ul`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.rowCount || 3}, 1fr)`};
  grid-template-columns: ${(props) => `repeat(${props.columnCount || 3}, 1fr)`};
  grid-gap: 2rem;
`;

const GridItem = styled.li`
  padding: 2.8rem 1.6rem;
  background-color: #ececec;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
`;

const SearchSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 2rem;

  @media (hover: hover) {
  }
`;

const TxtInput = styled.input`
  padding: 1rem;
  margin-right: 1rem;
`;

const LoginSection = styled.section`
  position: fixed;
  width: 100vw;
  height: calc(100vh - 7rem);
  top: 0;
  left: 0;
  top: 7rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000aa;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 10rem;
  background: white;
  padding: 6rem;

  & > input {
    margin-bottom: 2rem;
    padding: 1rem;
  }
`;

const MyItemsWrap = styled.section`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background-color: #ccc;
  padding: 2rem;

  .items {
    display: flex;
    overflow-x: auto;
  }

  h3 {
    margin-bottom: 1.2rem;
  }
`;

const MyItemsBook = styled.div`
  background-color: #acacac;
  padding: 2rem;
  margin-right: 2rem;
`;

const Button = styled.button`
  font-family: 'Open Sans', sans-serif;
  font-weight: 300;
  padding: 1rem;
  color: #333;
  margin: 1rem 0.4rem;
  border-radius: 0.4rem;
  border: 1px solid #aaa;
  &:disabled {
    opacity: 0.3;
  }
`;

export {
  Button,
  GridList,
  GridItem,
  SearchSection,
  TxtInput,
  LoginSection,
  LoginForm,
  MyItemsWrap,
  MyItemsBook,
};
