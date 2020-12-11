import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS } from '../styles/globals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faCheck } from '@fortawesome/free-solid-svg-icons';

const PopUpBanner = ({ text, active, error }) => {

  const GET_ACTIVE = useSelector((state) => state.popUpActive);
  const GET_MESSAGE = useSelector((state) => state.popUpMessage);
  const GET_STYLE = useSelector((state) => state.popUpStyle);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_POP_UP'
      })
    }, 5000)
  }, [GET_ACTIVE])

  return (
    <PopUpWrapper active={GET_ACTIVE}>
      <Banner bannerStyle={GET_STYLE}>
        <p>
          <span><FontAwesomeIcon style={{ width: '25px', color: COLORS.white }} icon={GET_STYLE === 'error' ? faExclamationTriangle : faCheck} /></span>
          <br />{GET_MESSAGE}
        </p></Banner>
    </PopUpWrapper>
  );
}

export default PopUpBanner;

const PopUpWrapper = styled.div`
  position: fixed;
  bottom: -10rem;
  transition: .4s ease-in;
  transform: ${props => props.active ? 'translate(0, -10rem)' : 'translate(0,0)'};
  width: 100%;
  display: grid;
  align-items: center;
  text-align: center;
  justify-content: right;
  z-index: 2000;
  padding: 0 1rem;
`;

const Banner = styled.div`
  background: ${props => props.bannerStyle === 'error' ? COLORS.red : COLORS.green};
  width: 100%;
  color: ${COLORS.white};
  padding: 2rem 5rem;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  box-shadow: 3px 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
`;