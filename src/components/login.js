import React, { useEffect, useReducer, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { LoginSection, LoginForm } from './common/styledComponents';
import loginScreenReducer from '../context/loginScreenReducer';
import { Button } from './common';

export default function Login() {
  const { isLoginScreen, toggleLoginScreen, setCurrentUser } = useContext(
    GlobalContext
  );
  const [state, dispatch] = useReducer(loginScreenReducer, {
    EMAIL: '',
    PASSWORD: '',
  });
  const { EMAIL, PASSWORD } = state;

  const submitForm = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userDetails = {
      email: data.get('email'),
      password: data.get('password'),
    };

    fetch(window.location.origin + '/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    })
      .then((response) => response.json())
      .then((user) => setCurrentUser(user));
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
        <Button onClick={toggleLoginScreen}>x</Button>
        <Button
          onClick={(e) => {
            dispatch({ type: 'SET_EMAIL', payload: 'joe@gmail.com' });
            dispatch({ type: 'SET_PASSWORD', payload: 'user_joe' });
          }}
        >
          User Joe
        </Button>
        <Button
          onClick={(e) => {
            dispatch({ type: 'SET_EMAIL', payload: 'joe@yahoo.com' });
            dispatch({ type: 'SET_PASSWORD', payload: 'admin_joe' });
          }}
        >
          Admin Joe
        </Button>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          placeholder='joe@gmail.com'
          value={EMAIL}
          onChange={(e) => {
            dispatch({ type: 'SET_EMAIL', payload: e.target.value });
          }}
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          placeholder='user_joe'
          value={PASSWORD}
          onChange={(e) =>
            dispatch({ type: 'SET_PASSWORD', payload: e.target.value })
          }
        />
        <Button type='submit'>submit</Button>
      </LoginForm>
    </LoginSection>
  );
}
