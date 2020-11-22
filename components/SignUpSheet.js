import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SIZES, COLORS, BP, BUTTON } from '../styles/globals';

const SignUpSheet = ({data, step, handlePrevClick, handleNextClick, loading}) => {

  const [companyType, setCompanyType] = useState('');

  const nextBtnClick = () => {
    if (step === 1 && companyType.length) {
      return true
    } else {
      return false
    }
  }

  return (
    <SignUpWrapper>
      <SignUpSidebar loading={loading ? 1 : 0}>
        <p>{ data[step - 1].stepHead }</p>
        <h3>{ data[step - 1].stepTitle }</h3>
      </SignUpSidebar>
      <SignUpContent loading={loading ? 1 : 0}>
        <p>{ data[step - 1].stepDescribtion }{ data[step - 1].required ? <span>*</span> : '' }</p>

        { step === 1 ?
          <p>Step 1 content</p>
        : '' }

        { step === 2 ?
          <p>Step 2 content</p>
        : '' }

        { step === 3 ?
          <p>Step 3 content</p>
        : '' }

        { step === 4 ?
          <p>Step 4 content</p>
        : '' }


        <SignUpButtons>
          { step !== 1 ? <PrevButton loading={loading ? 1 : 0} step={step} onClick={handlePrevClick}><span><img src={require('../assets/icon-left-arrow.svg')} alt="left arrow" style={{ width: '7px', marginRight: '3px' }} /></span> { data[step - 2].stepTitle }</PrevButton> : ''}
          <NextButton active={nextBtnClick()} onClick={handleNextClick}>{ step === 4 ?  <span>Sign up<img src={require('../assets/icon-checkmark-white.svg')} alt="check" style={{ width: '11px', marginLeft: '4px' }} /></span> : <span>Next<img src={require('../assets/icon-right-arrow-white.svg')} alt="check" style={{ width: '7px', marginLeft: '8px' }} /></span> }</NextButton>
        </SignUpButtons>
      </SignUpContent>
    </SignUpWrapper>
  );
}

const SignUpWrapper = styled.div`
  width: 100%;
  display: block;
  padding: ${SIZES.small};
  height: auto;
  margin: 0 auto;
  max-width: 1020px;

  @media (min-width: ${BP.small}) {
    height: 33rem;
    display: flex;
    padding: ${SIZES.big};
  }
`;

const SignUpSidebar = styled.div`
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  width: 100%;
  padding: ${SIZES.small};
  text-align: center;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  h3 {
    margin-top: 0;
  }

  h3 {
    transition: .2s ease;
    transform: ${({ loading }) => loading ? 'translateX(17px)' : 'translateX(0px)' };
    opacity: ${({ loading }) => loading ? 0 : 1 }
  }

  @media (min-width: ${BP.small}) {
    width: 40%;
    text-align: left;
  }
`;

const SignUpContent = styled.div`
  background-color: ${COLORS.white};
  color: ${COLORS.black};
  width: 100%;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
  text-align: center;
  position: relative;

  p {
    padding: ${SIZES.small};
    font-size: 100%;
    font-weight: 100;
    color: ${COLORS.darkGray};
    transition: .2s ease;
    opacity: ${({ loading }) => loading ? 0 : 1 };

    span {
      color: ${COLORS.orange};
      font-weight: 700;
      font-size: 120%;
    }
  }

  @media (min-width: ${BP.small}) {
    text-align: left;
  }
`;

const SignUpButtons = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: ${SIZES.small};
  display: flex;
`;

const PrevButton = styled.button`
  color: ${COLORS.darkGray};
  background-color: transparent;
  transition: .2s ease;
  pointer-events: ${({ loading }) => loading ? 'none' : 'all' };
  opacity: ${({ loading }) => loading ? '0' : '1' };
  display: ${({ step }) => step === 1 ? 'none' : 'block' };
`;

const NextButton = styled.button`
  margin-left: auto;
  padding: ${BUTTON.padding};
  border-radius: ${BUTTON.borderRadius};
  background-color: ${COLORS.orange};
  color: ${COLORS.white};
  opacity: ${({ active }) => active ? '1' : '.3' };
  pointer-events: ${({ active }) => active ? 'all' : 'none' };
`;

export default SignUpSheet;