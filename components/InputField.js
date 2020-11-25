import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { SIZES, COLORS } from '../styles/globals';
import { useSelector, useDispatch } from 'react-redux';


const InputField = ({ type, label, setter, getter }) => {

  const [value, setValue] = useState('');

  const GET_STATE = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setValue(GET_STATE[getter]);
  }, []);

  const handleInput = (val) => {
    dispatch({
      type: setter,
      payload: val
    })
    setValue(val);
  }

  return (
    <InputPair>
      <label>
        { label } <br />
        <input value={value} type={type} onChange={(e) => handleInput(e.target.value)} />
      </label>
    </InputPair>
  );
}

const InputPair = styled.div`
  width: 100%;
  display: block;
  padding: 0 ${SIZES.small};
  margin: ${SIZES.small} 0;

  label {
    color: ${COLORS.darkGray};

    input {
      width: 100%;
      margin-top: 2px;
      padding: .5rem;
      border-radius: 5px;
      border: 1px solid ${COLORS.darkGray};
      outline: none;
    }
  }
`;

export default InputField;