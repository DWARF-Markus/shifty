import styled from 'styled-components';
import { COLORS, BP } from '../styles/globals';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/items';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { format, differenceInHours, isWithinInterval } from 'date-fns';

const ShiftCard = ({ brightMode, employeesList, shift, isAdmin, userId, loginData }) => {

  const [employees, setEmployees] = useState([]);
  const [spotsLeft, setSpotsLeft] = useState([]);
  const [shiftLength, setShiftLength] = useState('');

  const dispatch = useDispatch();

  const GET_SHIFT = useSelector((state) => state.shifts.find((entry) => entry.id === shift.id));

  useEffect(() => {
    if (GET_SHIFT) {
      setTimeout(() => {
        const newEmployeeArr = GET_SHIFT.CompanyShiftEmployee.map((shift) => shift.employeeId)
        setEmployees(newEmployeeArr);
      }, 500);
    };
  }, [GET_SHIFT, shift]);

  useEffect(() => {

    const arr = [];
    for (let i = 0; i < shift.employeeAmount; i++) {
      const entry = i;
      arr.push(entry);
    }

    setSpotsLeft(arr);

    setShiftLength(differenceInHours(new Date(shift.endTime), new Date(shift.startTime)));

    if (shift.CompanyShiftEmployee) {
      setEmployees(shift.CompanyShiftEmployee.map((shift) => {
        return shift.employeeId
      }));
    }
  }, [])

  const handleEmployeeDrop = async (item) => {
    if (employees.includes(item.id)) {
      dispatch({
        type: 'SET_POP_UP',
        payload: `${item.firstName} is already assigned to this shift.`
      });
      return
    }

    const overlappingVacations = item.vacations.filter((vacation) => isWithinInterval(new Date(shift.startTime), { start: new Date(vacation.dateStart), end: new Date(vacation.dateEnd) }));

    if (overlappingVacations.length > 0) {
      dispatch({
        type: 'SET_POP_UP_ERROR',
        payload: 'This employee is on vacation on this date.'
      });
      return
    } else {
      if (employees.length <= (shift.employeeAmount - 1)) {
        setEmployees(employees.concat([item.id]));
        await fetch('/api/shift/employee', {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            data: {
              shiftId: parseInt(shift.id),
              employeeId: parseInt(item.id),
              companyId: parseInt(shift.companyId),
              shiftStart: format(new Date(shift.startTime), 'dd. MMM yyyy'),
              fullName: `${item.firstName} ${item.lastName}`
            }
          })
        })
          .then(res => res.json())
          .then(data => {
            dispatch({
              type: 'SET_POP_UP',
              payload: `You have added ${item.firstName} to this shift`
            });
            dispatch({
              type: 'SET_EMPLOYEE_TO_SHIFT',
              payload: { shiftId: shift.id, employee: item }
            })
          });
      } else {
        dispatch({
          type: 'SET_POP_UP_ERROR',
          payload: 'You cannot add more employees to this shift.'
        });
      }
    }

  };

  const handleShiftClick = async () => {
    if (!isAdmin) {
      if (employees.includes(userId)) {
        dispatch({
          type: 'SET_POP_UP',
          payload: `You are already assigned on this shift.`
        });
        return
      }

      if (employees.length <= shift.employeeAmount) {
        setEmployees(employees.concat([userId]));
        await fetch('/api/shift/employee', {
          method: 'POST',
          headers: {
            'Content-Type': "application/json"
          },
          body: JSON.stringify({
            data: {
              shiftId: parseInt(shift.id),
              employeeId: parseInt(userId),
              companyId: parseInt(shift.companyId),
              shiftStart: format(new Date(shift.startTime), 'dd. MMM yyyy'),
              fullName: `${loginData.firstName} ${loginData.lastName}`
            }
          })
        })
          .then(res => res.json())
          .then(data => {
            dispatch({
              type: 'SET_POP_UP',
              payload: `You are now assigned to this shift.`
            });
          });
      }
    } else {
      dispatch({
        type: 'SET_SHIFT_MODAL_CONTENT',
        payload: shift
      });
    }
  }

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item, monitor) => handleEmployeeDrop(item),
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <Wrapper brightMode={brightMode} isOver={isOver} ref={drop} isNow={isWithinInterval(new Date(), { start: new Date(shift.startTime), end: new Date(shift.endTime) })} shiftLength={shiftLength} onClick={() => handleShiftClick()} isAssigned={employees.includes(userId) && !isAdmin} isAdmin={isAdmin} isFull={shift.employeeAmount === employees.length}>
      <p className="title">{shift.title}</p>
      <p className="time">{format(new Date(shift.startTime), 'HH:mm')} <FontAwesomeIcon icon={faLongArrowAltRight} /> {format(new Date(shift.endTime), 'HH:mm')}</p>
      <PlaceholderWrapper>
        {spotsLeft ? spotsLeft.map(() => {
          return (
            <EmployeeEntryPlaceholder brightMode={brightMode} />
          )
        }) : ''}
      </PlaceholderWrapper>
      <EmployeesWrapper>
        {employeesList ? employeesList.map((employee) => {
          if (employees.includes(employee.id)) {
            return (
              <EmployeeEntry key={employee.id}>
                <img src={employee.profileImage ? employee.profileImage : require('../assets/icon-dot-orange.svg')} />
              </EmployeeEntry>
            );
          }
        }) : ''}
      </EmployeesWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  margin: .3rem;
  border-radius: 5px;
  pointer-events: ${({ isFull, isAdmin }) => isFull && !isAdmin ? 'none' : 'all'};
  /* border-top: 1px solid ${COLORS.darkGray};
  border-right: 1px solid ${COLORS.darkGray};
  border-bottom: 1px solid ${COLORS.darkGray}; */
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  ${props => props.isAdmin && `
     border-left: 5px solid ${props.isFull ? COLORS.green : COLORS.red}; 
 `};

  ${props => !props.isAdmin && props.isFull && `
      border-left: 5px solid ${props.brightMode ? COLORS.lightGray : '#484848'}; 
      opacity: 0.5!important;
  `};

  ${props => !props.isAdmin && !props.isFull && `
      border-left: 5px solid ${COLORS.orange}; 
  `};

  ${props => props.isAssigned && `
      border-left: 5px solid ${COLORS.orange}!important;
      opacity: 1!important;
  `};

  ${props => props.shiftLength <= 5 && `
      height: 4rem;
  `}

  ${props => props.shiftLength >= 5 && `
      height: 5rem;
  `}

  ${props => props.shiftLength >= 7 && `
      height: 7rem;
  `}

@keyframes active {
    0% {
      background-color: #e7a87a;
      transform: scale(1.05);
    }
    50% {
      background-color: ${COLORS.lightGray};
      transform: scale(1.0);
    }
    100% {
      background-color: #e7a87a;
      transform: scale(1.05);
    }
  } 

  background-color: ${({ brightMode }) => brightMode ? COLORS.white : 'black'};
  background-color: ${({ isOver, isAssigned }) => isOver || isAssigned ? COLORS.orange : 'none'};

  ${props => props.isAssigned && `
      color: ${props.brightMode ? COLORS.white : COLORS.white};
  `};

  ${props => !props.isAssigned && `
      color: ${props.brightMode ? COLORS.black : COLORS.white};
  `};

  opacity: ${({ isOver }) => isOver ? '0.7' : '1'};
  transition: .2s ease;
  text-align: center;
  cursor: pointer;
  animation: ${({ isNow }) => isNow ? 'active 2s infinite' : ''};

  p {
    position: absolute;
    text-align: center;
    right: 3px;
    top: 0px;
    margin-top: 1px;
    width: 100%;
    font-size: 7px;
  }

  .title {
    text-align: center;
    font-size: 10px;
    font-weight: 600;
    margin-left: 11px;
    line-height: 1.3;
  }

  .time {
    top: 10px;

    svg {
      max-width: 9px;
    }
  }

  &:hover {
    background-color: ${({ isAssigned }) => isAssigned ? COLORS.orange : COLORS.darkGray};
    color: ${({ isAssigned }) => isAssigned ? COLORS.white : COLORS.black};
  }

  @media (min-width: ${BP.small}) {
    p {
      font-size: 10px;
    }
  }
`;

const EmployeeEntry = styled.div`
  margin-right: -5px;
  img {
    width: 25px;
    height: 25px;
    object-fit: cover;
    border-radius: 50%;
    z-index: 2;
    border: 1px solid ${COLORS.darkGray};
  }
`;

const EmployeesWrapper = styled.div`
  display: flex;
  bottom: 5px;
  position: absolute;
  right: 10px;

  /* &:last-child {
    margin-right: 8px!important;
  } */
`;

const PlaceholderWrapper = styled.div`
  position: absolute;
  display: flex;
  bottom: 9px;
  position: absolute;
  right: 10px;
  z-index: 0;
`;

const EmployeeEntryPlaceholder = styled.div`
  width: 25px;
  height: 25px;
  border: 1px solid ${COLORS.darkGray};
  border-radius: 50%;
  background-color: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
  box-shadow: ${({ brightMode }) => brightMode ? `inset 0px 2px 4px ${COLORS.darkGray}` : 'inset 0px 2px 4px black'};
  z-index: 1;
  margin-right: -5px;
`;

export default ShiftCard;