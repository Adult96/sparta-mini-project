import React, { useState } from 'react';
import { AiFillLock } from 'react-icons/ai';
import { HiOutlineUserAdd } from 'react-icons/hi';
import styled from 'styled-components';

import Button from '../elements/Button';
import Input from '../elements/Input';

import Valid from '../validation/inputValidation';
import ALERT from '../constants/alert';

export default function Login() {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [pwCheck, setPwCheck] = useState('');
  const [signUp, setSignUp] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (signUp) {
      if (!Valid.formEmpty(id, pw, pwCheck)) {
        return alert(ALERT.CHECK_EMPTY);
      }
      if (!Valid.pwDifferentCheck(pw, pwCheck)) {
        return alert(ALERT.CHECK_DIFF_PW);
      }
    } else {
      if (!Valid.formEmpty(id, pw)) {
        return alert(ALERT.CHECK_EMPTY);
      }
    }

    loginProcess();
  };

  const handleSignUp = () => {
    resetLoginInput();
    setSignUp(v => !v);
  };

  const loginProcess = async () => {};

  const resetLoginInput = () => {
    setId('');
    setPw('');
    setPwCheck('');
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <h1>{signUp ? <HiOutlineUserAdd /> : <AiFillLock />}</h1>
        <Input
          name='id'
          width='20rem'
          height='2.5rem'
          fontSize='1.3rem'
          placeholder='ID'
          value={id}
          onChange={e => setId(e.target.value)}
          autoFocus={true}
        />
        <Input
          type={showPw ? 'text' : 'password'}
          width='20rem'
          height='2.5rem'
          fontSize='1.3rem'
          value={pw}
          onChange={e => setPw(e.target.value)}
          placeholder='PW'
        />
        {signUp && (
          <Input
            type={showPw ? 'text' : 'password'}
            width='20rem'
            height='2.5rem'
            fontSize='1.3rem'
            value={pwCheck}
            onChange={e => setPwCheck(e.target.value)}
            placeholder='PW CHECK'
          />
        )}
        <ShowPasswordContainer>
          <Input
            type='checkbox'
            onChange={e => {
              setShowPw(e.target.checked);
            }}
          />
          <span>Show Password</span>
        </ShowPasswordContainer>
        <ButtonContainer>
          <Button width='10rem' height='3rem'>
            {signUp ? 'Enter' : 'Login'}
          </Button>
          <Button
            width='10rem'
            height='3rem'
            type='button'
            click={handleSignUp}
          >
            {signUp ? 'back' : 'SignUp'}
          </Button>
        </ButtonContainer>
      </LoginForm>
    </LoginWrapper>
  );
}

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 1rem;
  border-left: 1px solid ${props => props.theme.borderColor};
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  gap: 1rem;
`;

const ShowPasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;