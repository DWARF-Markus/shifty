import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SignUpSheet from './SignUpSheet';
import data from '../assets/sign-up-sheet-data.json';
import styled from 'styled-components';


const SignUpForm = () => {
  const [loading, setLoading] = useState(false);

  const step = useSelector((state) => state.step);
  const dispatch = useDispatch();
  const increment = () => {
    if (step !== 4) {
      setLoading(true);
      setTimeout(() => {
        dispatch({
          type: 'INCREMENT_STEP',
        })
        setLoading(false);
      }, 400);
    }
  }
  const decrement = () => {
    if (step !== 1) {
      setLoading(true);
      setTimeout(() => {
      dispatch({
        type: 'DECREMENT_STEP',
      })
      setLoading(false);
      }, 400);
    }
  }

  return (
    <>
      <SignUpSheet data={data} step={step} handlePrevClick={decrement} handleNextClick={increment} loading={loading} />
      <SignUpDots>
        {data.map((entry, index) => {
          return <img key={index} src={index + 1 <= step ? require('../assets/icon-dot-orange.svg') : require('../assets/icon-dot-gray.svg')} alt="dot" style={{ width: '12px', marginLeft: '7px' }} />
        })}
      </SignUpDots>
    </>
  )
}

const SignUpDots = styled.div`
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
`;

export default SignUpForm;
