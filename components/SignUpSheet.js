import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { SIZES, COLORS, BP, BUTTON } from '../styles/globals';
import SignUpSmallCards from './SignUpSmallCards';
import SignUpMediumCards from './SignUpMediumCards';
import CheckBox from './CheckBox';
import InputField from './InputField';

import { faCoffee, faBeer, faPizzaSlice, faHotel, faClinicMedical, faQuestionCircle, faUserFriends, faUsers } from '@fortawesome/free-solid-svg-icons';


const SignUpSheet = ({ brightMode, data, step, handlePrevClick, handleNextClick, loading }) => {

  const GET_STATE = useSelector((state) => state);

  const businessTypes = [
    {
      name: 'Café',
      icon: faCoffee
    },
    {
      name: 'Bar',
      icon: faBeer
    },
    {
      name: 'Restuarant',
      icon: faPizzaSlice
    },
    {
      name: 'Hotel',
      icon: faHotel
    },
    {
      name: 'Nursing home',
      icon: faClinicMedical
    },
    {
      name: 'Other',
      icon: faQuestionCircle
    },
  ];

  const businessSizes = [
    {
      name: 'Small',
      amount: '(2-10)',
      icon: faUserFriends
    },
    {
      name: 'Medium',
      amount: '(11-49)',
      icon: faUsers
    },
    {
      name: 'Large',
      amount: '(50+)',
      icon: faHotel
    },
  ]

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  const nextBtnClick = () => {
    if (step === 1 && GET_STATE.businessType || step === 2 && GET_STATE.businessSize || step === 3 || step === 4 && GET_STATE.companyName && validateEmail(GET_STATE.email) && GET_STATE.signUpPassword === GET_STATE.signUpPasswordConfirm && GET_STATE.signUpPassword.length >= 7) {
      return true;
    } else {
      return false
    }
  };

  return (
    <>
      <SignUpWrapper>
        <SignUpSidebar loading={loading ? 1 : 0}>
          <p>{data[step - 1].stepHead}</p>
          <h3>{data[step - 1].stepTitle}</h3>
        </SignUpSidebar>
        <SignUpContent brightMode={brightMode} loading={loading ? 1 : 0}>
          <SignUpContentText loading={loading ? 1 : 0}>{data[step - 1].stepDescribtion}{data[step - 1].required ? <span>*</span> : ''}</SignUpContentText>

          {step === 1 ?
            <StepOne loading={loading ? 1 : 0}>
              <SignUpSmallCards brightMode={brightMode} businessTypes={businessTypes} />
            </StepOne>
            : ''}

          {step === 2 ?
            <StepTwo loading={loading ? 1 : 0}>
              <SignUpMediumCards businessSizes={businessSizes} />
            </StepTwo>
            : ''}

          {step === 3 ?
            <StepThree loading={loading ? 1 : 0}>
              <CheckBox title={'Monday'} index={0} setter={'SET_MONDAY'} getter={'monday'} />
              <CheckBox title={'Tuesday'} index={1} setter={'SET_TUESDAY'} getter={'tuesday'} />
              <CheckBox title={'Wednesday'} index={2} setter={'SET_WEDNESDAY'} getter={'wednesday'} />
              <CheckBox title={'Thursday'} index={3} setter={'SET_THURSDAY'} getter={'thursday'} />
              <CheckBox title={'Friday'} index={4} setter={'SET_FRIDAY'} getter={'friday'} />
              <CheckBox title={'Saturday'} index={5} setter={'SET_SATURDAY'} getter={'saturday'} />
              <CheckBox title={'Sunday'} index={6} setter={'SET_SUNDAY'} getter={'sunday'} />
            </StepThree>
            : ''}

          {step === 4 ?
            <>
              <InputField brightMode={brightMode} type="text" label="Company name" setter={'SET_COMPANY_NAME'} getter={'companyName'} />
              <InputField brightMode={brightMode} type="email" label="Email" setter={'SET_EMAIL'} getter={'email'} />
              <InputField brightMode={brightMode} type="password" label="Password" setter={'SIGN_UP_PASSWORD'} getter={'signUpPassword'} />
              <InputField brightMode={brightMode} type="password" label="Confirm password" setter={'SIGN_UP_PASSWORD_CONFIRM'} getter={'signUpPasswordConfirm'} />
            </>
            : ''}


          <SignUpButtons>
            {step !== 1 ? <PrevButton loading={loading ? 1 : 0} step={step} onClick={handlePrevClick}><span><img src={require('../assets/icon-left-arrow.svg')} alt="left arrow" style={{ width: '7px', marginRight: '3px' }} /></span> {data[step - 2].stepTitle}</PrevButton> : ''}
            <NextButton loading={loading ? 1 : 0} active={nextBtnClick()} onClick={handleNextClick}>{step === 4 ? <span>Sign up<img src={require('../assets/icon-checkmark-white.svg')} alt="check" style={{ width: '11px', marginLeft: '4px' }} /></span> : <span>Next<img src={require('../assets/icon-right-arrow-white.svg')} alt="check" style={{ width: '7px', marginLeft: '8px' }} /></span>}</NextButton>
          </SignUpButtons>
        </SignUpContent>
      </SignUpWrapper>
    </>
  );
}

const SignUpWrapper = styled.div`
  width: 100%;
  display: block;
  padding: ${SIZES.small};
  height: calc(100% + 5rem);
  margin: 0 auto;
  max-width: 1020px;

  @media (min-width: ${BP.small}) {
    height: 36rem;
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
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  h3 {
    margin-top: 0;
  }

  h3 {
    transition: .2s ease;
    transform: ${({ loading }) => loading ? 'translateX(17px)' : 'translateX(0px)'};
    opacity: ${({ loading }) => loading ? 0 : 1}
  }

  @media (min-width: ${BP.small}) {
    width: 40%;
    text-align: left;
    border-top-right-radius: 0;
    border-bottom-left-radius: 5px;
  }
`;

const SignUpContent = styled.div`
  background-color: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
  color: ${COLORS.black};
  width: 100%;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
  text-align: center;
  position: relative;
  padding: 1px .5rem;

  @media (min-width: ${BP.small}) {
    text-align: left;
    border-bottom-left-radius: 0;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

`;

const SignUpContentText = styled.p`
    padding: ${SIZES.small};
    font-size: 100%;
    font-weight: 100;
    color: ${COLORS.darkGray};
    transition: .2s ease;
    opacity: ${({ loading }) => loading ? 0 : 1};

    span {
      color: ${COLORS.orange};
      font-weight: 700;
      font-size: 120%;
    }
`;

const SignUpButtons = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: ${SIZES.small};
  display: flex;
  transform: translate(0, 4.5rem);
  pointer-events: ${props => props.loading ? 'none' : 'all'};

  @media (min-width: ${BP.small}) {
    transform: none;
  }

`;

const PrevButton = styled.button`
  color: ${COLORS.darkGray};
  background-color: transparent;
  transition: .2s ease;
  pointer-events: ${({ loading }) => loading ? 'none' : 'all'};
  opacity: ${({ loading }) => loading ? '0' : '1'};
  display: ${({ step }) => step === 1 ? 'none' : 'block'};
`;

const NextButton = styled.button`
  margin-left: auto;
  padding: ${BUTTON.padding};
  border-radius: ${BUTTON.borderRadius};
  background-color: ${COLORS.orange};
  color: ${COLORS.white};
  transition: .2s ease-in;
  opacity: ${({ loading, active }) => loading || !active ? '.2' : '1'};
  pointer-events: ${({ loading, active }) => loading || !active ? 'none' : 'all'};
`;

const StepOne = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: ${SIZES.small};
  grid-gap: ${SIZES.small};
  opacity: ${props => props.loading ? 0 : 1};
  transition: .2s ease;

  @media (min-width: ${BP.small}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const StepTwo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin: ${SIZES.small};
  grid-gap: ${SIZES.small};
  opacity: ${props => props.loading ? 0 : 1};
  transition: .2s ease;

  @media (min-width: ${BP.small}) {
    grid-template-columns: 1fr 1fr 1fr;
    height: 19rem;
  }
`;

const StepThree = styled.div`
  margin: ${SIZES.small};
  opacity: ${props => props.loading ? 0 : 1};
  transition: .2s ease;
`;

export default SignUpSheet;