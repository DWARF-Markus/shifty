import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SIZES, COLORS, BP } from '../styles/globals';
import styled from 'styled-components';

const SignUpMediumCards = ({ businessSizes }) => {

  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const GET_BUSINESS_SIZE = useSelector((state) => state.businessSize);

  useEffect(() => {
    if (GET_BUSINESS_SIZE) {
      setSelected(GET_BUSINESS_SIZE)
    }
  }, [])
  
  const handleSelect = (val) => {
    setSelected(val);
    SET_BUSINESS_SIZE(val);
  }

  const SET_BUSINESS_SIZE = (payload) => {
    dispatch({
      type: 'SET_BUSINESS_SIZE',
      payload
    })
  }

  return (
    <>
      {businessSizes.map((entry, index) => {
        return (
          <Card active={selected === entry.name} key={index} onClick={() => handleSelect(entry.name)}>
            <div>
              <FontAwesomeIcon icon={entry.icon} />
              <p>{ entry.name }</p>
              <p>{ entry.amount }</p>
            </div>
          </Card>
        )
      })}
    </>
  );
}

const Card = styled.div`
  div {
    height: auto;
    width: 100%;
    text-align: center;
    padding: ${SIZES.small};
    border-radius: 5px;
    display: grid;
    align-content: center;
    justify-items: center;
    color: ${COLORS.darkGray};
    border: 2px solid ${COLORS.lightGray};
    cursor: pointer;
    transition: .2s ease;
    ${props => props.active && { backgroundColor: COLORS.orange + '!important' }}

    p {
      padding: 0 ${SIZES.small};
      ${props => props.active && { color: COLORS.white + '!important' }}
    }

    svg {
      width: 25px;
      ${props => props.active && { color: COLORS.white + '!important' }}
    }

    @media (min-width: ${BP.small}) {
      height: 100%;
    }
  }

  &:hover {
    background-color: ${COLORS.lightGray};
    div {
      p {
        color: ${COLORS.darkGray};
      }
    }
  }
`;

export default SignUpMediumCards;