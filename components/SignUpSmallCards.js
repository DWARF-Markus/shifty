import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SIZES, COLORS, BP } from '../styles/globals';
import styled from 'styled-components';

const SignUpSmallCards = ({ businessTypes }) => {

  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const GET_BUSINESS_TYPE = useSelector((state) => state.businessType);

  useEffect(() => {
    if (GET_BUSINESS_TYPE) {
      setSelected(GET_BUSINESS_TYPE)
    }
  }, [])
  
  const handleSelect = (val) => {
    setSelected(val);
    SET_BUSINESS_TYPE(val);
  }

  const SET_BUSINESS_TYPE = (payload) => {
    dispatch({
      type: 'SET_BUSINESS_TYPE',
      payload
    })
  }

  return (
    <>
      {businessTypes.map((entry, index) => {
        return (
          <Card active={selected === entry.name} key={index} onClick={() => handleSelect(entry.name)}>
            <div>
              <FontAwesomeIcon icon={entry.icon} width={'30px'} />
              <p>{ entry.name }</p>
            </div>
          </Card>
        )
      })}
    </>
  );
}

const Card = styled.div`
  div {
    height: 8rem;
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
      ${props => props.active && { color: COLORS.white + '!important' }}
    }

    @media (min-width: ${BP.small}) {
      height: 9.7rem;
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

export default SignUpSmallCards;