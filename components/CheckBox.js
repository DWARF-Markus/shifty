import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { COLORS } from '../styles/globals';

const CheckBox = ({selected, title, index, setter, getter}) => {

  const [checked, setChecked] = useState('');
  const GET_STATE = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setChecked(GET_STATE[getter]);
  }, [])

  const handleClick = () => {
    dispatch({
      type: setter,
      payload: !checked,
    })
    setChecked(!checked);
  }

  return (
    <>
      <CheckBoxWrapper selected={checked} onClick={() => handleClick()}>
        <p>
          <span>
            { checked ? <FontAwesomeIcon icon={faTimes} width={'11px'} /> : '' }  
          </span>
          { title }
        </p>
      </CheckBoxWrapper>
    </>
  );
}

const CheckBoxWrapper = styled.div`
  cursor: pointer;
  color: ${props => props.selected ? COLORS.orange : COLORS.darkGray };

  p {
    display: flex;
    align-items: center;
    font-size: 15px;

    span {
      margin-right: 5px;
      padding-left: 3px;
      display: flex;
      align-items: center;
      border-radius: 5px;
      border: 1px solid ${props => props.selected ? COLORS.orange : COLORS.darkGray };
      height: 19px;
      width: 19px;
    }
  }
`;

export default CheckBox;