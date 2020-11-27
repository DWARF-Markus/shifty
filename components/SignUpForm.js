import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignUpSheet from './SignUpSheet';
import data from '../assets/sign-up-sheet-data.json';
import styled from 'styled-components';
import Router from 'next/router';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from '../styles/globals';

const SignUpForm = () => {
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const GET_STATE = useSelector((state) => state);
  const dispatch = useDispatch();
  const increment = () => {
    if (GET_STATE.step !== 4) {
      setLoading(true);
      setTimeout(() => {
        dispatch({
          type: 'INCREMENT_STEP',
        })
        setLoading(false);
      }, 400);
    } else {
      handleNewCompanySignUp();
    }
  }
  const decrement = () => {
    if (GET_STATE.step !== 1) {
      setLoading(true);
      setTimeout(() => {
      dispatch({
        type: 'DECREMENT_STEP',
      })
      setLoading(false);
      }, 400);
    }
  }

  const handleNewCompanySignUp = async () => {
    setSubmitting(true);
    const obj = {
      company: {
        name: GET_STATE.companyName,
        email: GET_STATE.email,
        password: GET_STATE.signUpPassword,
        days: `${GET_STATE.monday ? '1' : '0'}${GET_STATE.tuesday ? '1' : '0'}${GET_STATE.wednesday ? '1' : '0'}${GET_STATE.thursday ? '1' : '0'}${GET_STATE.friday ? '1' : '0'}${GET_STATE.saturday ? '1' : '0'}${GET_STATE.sunday ? '1' : '0'}`,
        size: GET_STATE.businessSize,
        type: GET_STATE.businessType
      }
    }

    await fetch('/api/company', {
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
  };

  return (
    <>
    { submitting ? <SignUpSpinner><FontAwesomeIcon icon={faSpinner} /></SignUpSpinner> : '' }
    {/* <ErrorBanner text={'Something went wrong - please try again'} active={error} /> */}
    <SignUpContainer submitting={submitting}>
      <SignUpSheet data={data} step={GET_STATE.step} handlePrevClick={decrement} handleNextClick={increment} loading={loading} />
      <SignUpDots>
        {data.map((entry, index) => {
          return <img key={index} src={index + 1 <= GET_STATE.step ? require('../assets/icon-dot-orange.svg') : require('../assets/icon-dot-gray.svg')} alt="dot" style={{ width: '12px', marginLeft: '7px' }} />
        })}
      </SignUpDots>
    </SignUpContainer>
    </>
  )
}

const SignUpContainer = styled.div`
  transition: .2s ease;
  opacity: ${({ submitting }) => submitting ? 0.25 : 1 };
`;

const SignUpDots = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
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

export default SignUpForm;
