import styled from 'styled-components';
import { COLORS, BP } from '../styles/globals';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format } from 'date-fns';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/items';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

const ShiftCard = ({ employeesList, shift }) => {

  const [employees, setEmployees] = useState([]);
  const [spotsLeft, setSpotsLeft] = useState([]);

  const dispatch = useDispatch();


  useEffect(() => {

    const arr = [];
    for (let i = 0; i < shift.employeeAmount; i++) {
      const entry = i;
      // setSpotsLeft(spotsLeft.concat([i]));
      arr.push(entry);
    }

    setSpotsLeft(arr);

    if (shift.CompanyShiftEmployee) {
      setEmployees(shift.CompanyShiftEmployee.map((shift) => {
        return shift.employeeId
      }));
    }
  }, [])

  const handleEmployeeDrop = async (item) => {
    console.log('item: ', item);
    console.log('shift id: ', shift.id);
    if (employees.includes(item.id)) {
      dispatch({
        type: 'SET_POP_UP',
        payload: `${item.firstName} is already assigned to this shift.`
      });
      return
    }

    if (employees.length !== shift.employeeAmount) {
      setEmployees(employees.concat([item.id]));
      await fetch('/api/addusertoshift', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          data: {
            shiftId: parseInt(shift.id),
            employeeId: parseInt(item.id)
          }
        })
      })
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'SET_POP_UP',
            payload: `You have added ${item.firstName} to this shift`
          });
        });
    } else {
      dispatch({
        type: 'SET_POP_UP_ERROR',
        payload: 'You cannot add more employees to this shift.'
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
    <Wrapper isOver={isOver} ref={drop}>
      <p>{format(new Date(shift.startTime), 'HH:mm')} <FontAwesomeIcon icon={faLongArrowAltRight} /> {format(new Date(shift.endTime), 'HH:mm')}</p>
      <p className="title">{shift.title}</p>
      <PlaceholderWrapper>
        {spotsLeft ? spotsLeft.map(() => {
          return (
            <EmployeeEntryPlaceholder />
          )
        }) : ''}
      </PlaceholderWrapper>
      <EmployeesWrapper>
        {employeesList ? employeesList.map((employee) => {
          if (employees.includes(employee.id)) {
            return (
              <EmployeeEntry key={employee.id}>
                <img src={employee.profileImage} />
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
  height: 5rem;
  border-radius: 5px;
  border-left: 5px solid ${COLORS.green};
  background-color: ${({ isOver }) => isOver ? COLORS.orange : COLORS.lightGray};
  color: ${({ isOver }) => isOver ? COLORS.white : COLORS.black};
  opacity: ${({ isOver }) => isOver ? '0.7' : '1'};
  transition: .2s ease;
  text-align: center;
  cursor: pointer;

  p {
    position: absolute;
    text-align: right;
    right: 3px;
    top: 0px;
    margin-top: 1px;
    width: 100%;
    font-size: 7px;
  }

  .title {
    text-align: left;
    color: gray;
    font-size: 10px;
    margin-left: 11px;
    left: -7px;
  }

  &:hover {
    background-color: ${COLORS.darkGray};
    color: ${COLORS.black};
  }

  @media (min-width: ${BP.small}) {
    p {
      font-size: 12px;
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
  border-radius: 50%;
  background-color: ${COLORS.white};
  z-index: 1;
  margin-right: -5px;
`;

export default ShiftCard;