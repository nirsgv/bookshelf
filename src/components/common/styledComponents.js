import styled, { css } from 'styled-components';

const GridList = styled.ul`
  display: grid;
  grid-template-rows: ${(props) => `repeat(${props.rowCount || 3}, 1fr)`};
  grid-template-columns: ${(props) => `repeat(${props.columnCount || 3}, 1fr)`};
  grid-gap: 2rem;
`;

const GridItem = styled.li`
  background-color: ${(props) => (props.value ? '#000' : '#ddd')};
  padding: 2.8rem 1.6rem;
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
  height: 10rem;
  background-color: #ccc;
  display: flex;
`;

const MyItemsItem = styled.div`
  background-color: #acacac;
  padding: 2rem;
  margin-right: 2rem;
`;

export {
  GridList,
  GridItem,
  SearchSection,
  TxtInput,
  LoginSection,
  LoginForm,
  MyItemsWrap,
  MyItemsItem,
};
