import InputField from './InputField';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';
import { COLORS } from '../styles/globals';

const ShiftForm = ({ brightMode }) => {

  const GET_STATE = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleNewShiftSubmit = async () => {
    await fetch(`/api/addshift`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        shift: {
          title: GET_STATE.newShiftTitle,
          startTime: `${GET_STATE.newShiftDate} ${GET_STATE.newShiftStartTime}`,
          endTime: `${GET_STATE.newShiftDate} ${GET_STATE.newShiftEndTime}`,
          employees: parseInt(GET_STATE.newShiftEmployeeAmount),
          company: parseInt(GET_STATE.loginData.id)
        }
      })
    }).then(res => res.json())
      .then(data => {
        if (data.status === 201) {
          dispatch({
            type: 'SET_SHIFT_MODAL',
            payload: false
          });
          dispatch({
            type: 'ADD_SHIFT',
            payload: {
              id: data.response.id,
              title: GET_STATE.newShiftTitle,
              startTime: `${GET_STATE.newShiftDate} ${GET_STATE.newShiftStartTime}`,
              endTime: `${GET_STATE.newShiftDate} ${GET_STATE.newShiftEndTime}`,
              employeeAmount: parseInt(GET_STATE.newShiftEmployeeAmount),
              companyId: parseInt(GET_STATE.loginData.id),
              CompanyShiftEmployee: [],
            }
          });
          dispatch({
            type: 'SET_POP_UP',
            payload: `Shift added on ${format(new Date(GET_STATE.newShiftDate), 'dd MMM')}`
          });
        } else {
          dispatch({
            type: 'SET_POP_UP_ERROR',
            payload: 'Something went wrong! Try again later',
          });
        }
      })
  }

  return (
    <ShiftFormWrapper brightMode={brightMode}>
      <p>Add shift</p>
      <InputField brightMode={brightMode} type="text" label="Title" setter={'SET_SHIFT_TITLE'} getter={'newShiftTitle'} />
      <InputField brightMode={brightMode} type="date" label="Date" setter={'SET_SHIFT_DATE'} getter={'newShiftDate'} />
      <InputField brightMode={brightMode} type="time" label="Start time" setter={'SET_SHIFT_STARTTIME'} getter={'newShiftStartTime'} />
      <InputField brightMode={brightMode} type="time" label="End time" setter={'SET_SHIFT_ENDTIME'} getter={'newShiftEndTime'} />
      <InputField brightMode={brightMode} type="number" label="Employees" setter={'SET_SHIFT_EMPLOYEE_AMOUNT'} getter={'newShiftEmployeeAmount'} />
      <button onClick={() => handleNewShiftSubmit()} className="btn--primary">Add</button>
    </ShiftFormWrapper>
  );
}

const ShiftFormWrapper = styled.div`
  p {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    font-size: 20px;
  }
  
  button {
    float: right;
  }
`;

export default ShiftForm;