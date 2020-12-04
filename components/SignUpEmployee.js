import { useState } from 'react';
import styled from 'styled-components';
import InputField from './InputField';
import { COLORS } from '../styles/globals';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SignUpEmployee = () => {

  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();
  const GET_STATE = useSelector((state) => state);

  const handleEmployeeSignup = async () => {
    setSubmitting(true);
    const obj = {
      employee: {
        firstName: GET_STATE.firstName,
        lastName: GET_STATE.lastName,
        email: GET_STATE.email,
        password: GET_STATE.signUpPassword,
        passwordConfirm: GET_STATE.signUpPasswordConfirm
      }
    }

    if (obj.employee.password !== obj.employee.passwordConfirm) {
      dispatch({
        type: 'SET_POP_UP_ERROR',
        payload: 'Make sure both passwords are the same'
      });
      return
    }

    await fetch('/api/employee', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(obj)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 201) {
          setTimeout(() => {
            setSubmitting(false);
            dispatch({
              type: 'SET_POP_UP',
              payload: 'You have signed up - you can now login!'
            });
          }, 1000);
          setTimeout(() => {
            Router.push('/');
          }, 1000);
        } else {
          setTimeout(() => {
            setSubmitting(false);
            dispatch({
              type: 'SET_POP_UP_ERROR',
              payload: 'Something went wrong - try again!'
            });
          }, 2000);
        }
      });
  }

  return (
    <>
      <SignUpEmployeeWrapper submitting={submitting}>
        {submitting ? <SignUpSpinner><FontAwesomeIcon icon={faSpinner} /></SignUpSpinner> : ''}
        <SignUpOpacity submitting={submitting}>
          <SignUpEmployeeHeader>
            <h3>Employee</h3>
          </SignUpEmployeeHeader>
          <SignUpEmployeeContent>
            <InputField type="text" required={true} label="First name" setter={'SET_FIRST_NAME'} getter={'firstName'} />
            <InputField type="text" required={true} label="Last name" setter={'SET_LAST_NAME'} getter={'lastName'} />
            <InputField type="email" required={true} label="Email" setter={'SET_EMAIL'} getter={'email'} />
            <InputField type="password" required={true} label="Password" setter={'SIGN_UP_PASSWORD'} getter={'signUpPassword'} />
            <InputField type="password" required={true} label="Password confirm" setter={'SIGN_UP_PASSWORD_CONFIRM'} getter={'signUpPasswordConfirm'} />
          </SignUpEmployeeContent>
          <SignUpEmployeeAction>
            <button onClick={() => handleEmployeeSignup()} className="btn--primary">Sign up</button>
          </SignUpEmployeeAction>
        </SignUpOpacity>
      </SignUpEmployeeWrapper>
    </>
  );
}

const SignUpEmployeeWrapper = styled.div`
  max-width: 450px;
  margin: 0 auto;
  padding: 3rem 0;
  position: relative;
`;

const SignUpEmployeeHeader = styled.div`
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  align-items: center;
  height: 6rem;
  display: grid;

}
`;

const SignUpEmployeeContent = styled.div`
  background-color: ${COLORS.white};
  padding: .5rem;
`;

const SignUpEmployeeAction = styled.div`
  background-color: ${COLORS.white};
  padding: 1rem 0;
`;

const SignUpSpinner = styled.div`
  position: absolute;
  color: ${COLORS.orange};
  width: 100%;
  height: 73%;
  display: grid;
  align-items: center;
  justify-content: center;

  @keyframes spin {
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
  }

  svg {
    width: 25px;
    animation: spin 1s infinite linear;
  }
`;

const SignUpOpacity = styled.div`
  opacity: ${({ submitting }) => submitting ? 0.25 : 1};
`;

export default SignUpEmployee;