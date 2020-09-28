import React, { useEffect, useReducer, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { LoginSection, LoginForm } from './common/styledComponents';
import loginScreenReducer from '../context/loginScreenReducer';

export default function Login() {
  const { isLoginScreen, toggleLoginScreen, setCurrentUser } = useContext(
    GlobalContext
  );
  const [state, dispatch] = useReducer(loginScreenReducer, {
    EMAIL: '',
    PASSWORD: '',
  });
  const { EMAIL, PASSWORD } = state;

  const submitForm = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userDetails = {
      email: data.get('email'),
      password: data.get('password'),
    };
    // console.log(userDetails);

    await fetch(window.location.origin + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((user) => setCurrentUser(user));
    // .then((data) => getAllItems(cb));
  };

  if (!isLoginScreen) return null;
  return (
    <LoginSection onClick={toggleLoginScreen}>
      <LoginForm
        onSubmit={submitForm}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button onClick={toggleLoginScreen}>x</button>
        <input
          type='text'
          name='email'
          // placeholder='Email'
          placeholder='joe@gmail.com'
          value={EMAIL}
          onChange={(e) => {
            dispatch({ type: 'SET_EMAIL', payload: e.target.value });
          }}
        />
        <input
          type='password'
          name='password'
          // placeholder='Password'
          placeholder='user_joe'
          value={PASSWORD}
          onChange={(e) =>
            dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
          }
        />
        <button type='submit'>submit</button>
      </LoginForm>
    </LoginSection>
  );
}
