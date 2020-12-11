import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { COLORS, BP } from '../styles/globals';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';

const ShiftEditorModal = ({ shiftObj, employeesList }) => {

  const [employees, setEmployees] = useState([]);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const GET_SHIFT = useSelector((state) => state.shifts.find((shift) => shift.id === shiftObj));

  useEffect(() => {
    const employeeIds = shiftObj.CompanyShiftEmployee.length > 0 ? shiftObj.CompanyShiftEmployee.map((employee) => employee.employeeId) : [];
    setEmployees(employeeIds);

    setTimeout(() => {
      setActive(true);
    }, 120);

    return () => {
      setActive(false);
    }
  }, [])

  const variants = {
    open: () => ({
      transform: 'translateX(0px)',
      opacity: 1,
      transition: {
        type: "spring",
        restDelta: 2
      }
    }),
    closed: () => ({
      transform: 'translateX(-50px)',
      opacity: 0,
      transition: {
        type: "spring",
        damping: 40
      }
    }),
  };

  const handleEmployeeRemove = async (employeeId) => {
    await fetch(`/api/removeuserfromshift?employeeId=${employeeId}&shiftId=${shiftObj.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          const filteredEmployees = employees.filter(id => id !== employeeId);
          setEmployees(filteredEmployees);
          dispatch({
            type: 'REMOVE_USER_FROM_SHIFT',
            payload: { shiftId: shiftObj.id, employeeId: employeeId }
          })
        }
      })
  }

  return (
    <ShiftEditorContainer>
      <motion.div
        animate={active ? "open" : "closed"}
        variants={variants}
        transition={{ duration: 2 }}
      >
        <ShiftEditorHeader>
          <div>
            <p>{format(new Date(shiftObj.startTime), 'dd MMMM yyyy @ HH:mm')} to {format(new Date(shiftObj.endTime), 'HH:mm')}</p>
            <h1>{shiftObj.title}</h1>
          </div>
          <Employees>
            {employeesList ? employeesList.map((employee) => {
              if (employees.includes(employee.id)) {
                return (
                  <div>
                    <img src={employee.profileImage ? employee.profileImage : require('../assets/icon-dot-orange.svg')} />
                    <p>{employee.firstName}</p>
                  </div>
                );
              }
            }) : ''}
          </Employees>
        </ShiftEditorHeader>
        <ShiftEditorBody>
          <EmployeesCount isFull={shiftObj.CompanyShiftEmployee.length === shiftObj.employeeAmount}>
            <p><FontAwesomeIcon style={{ width: '30px' }} icon={shiftObj.CompanyShiftEmployee.length === shiftObj.employeeAmount ? faCheckCircle : faExclamationTriangle} />{shiftObj.CompanyShiftEmployee.length}/{shiftObj.employeeAmount} employees</p>
          </EmployeesCount>
          {employeesList ? employeesList.map((employee) => {
            if (employees.includes(employee.id)) {
              return (
                <EmployeeCard>
                  <img src={employee.profileImage ? employee.profileImage : require('../assets/icon-dot-orange.svg')} />
                  <div>
                    <p>{employee.firstName} {employee.lastName}</p>
                  </div>
                  <button onClick={() => handleEmployeeRemove(employee.id)}>Remove</button>
                </EmployeeCard>
              );
            }
          }) : ''}
        </ShiftEditorBody>
      </motion.div>
    </ShiftEditorContainer>
  );
}

const ShiftEditorContainer = styled.div`
  width: 100%;
  max-width: 45rem;
  position: absolute;
  margin-top: 7rem;
  background-color: white;
  border: 1px solid ${COLORS.lightGray};
  padding: 1rem;
`;

const ShiftEditorHeader = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  text-align: center;
  margin: .5rem 0;
  padding: 0 0 1rem 0;

  @media (min-width: ${BP.small}) {
    grid-template-columns: 1fr 1fr;
    text-align: left;
  }
  

  h1 {
    margin: .3rem 0 .8rem;
  }

  p {
    color: ${COLORS.black};
    margin: 0;
    font-size: 11px;
    opacity: .6;
  }
`;

const Employees = styled.div`
  display: none;
  text-align: right;
  margin: auto 0 auto auto;

  @media (min-width: ${BP.small}) {
    display: flex;
  }

  div {

    text-align: center;
    
      img {
        margin: 0 2px;
        max-width: 45px;
        width: 45px;
        height: 45px;
        border: 2px solid ${COLORS.darkGray};
        object-fit: cover;
        border-radius: 50%;
      }

      p {
        margin-top: -6px;
        color: ${COLORS.black};
      }
  }
`;

const ShiftEditorBody = styled.div`
  h4 {
    font-weight: 100;
  }
`;

const EmployeesCount = styled.div`
  color: ${({ isFull }) => isFull ? COLORS.green : COLORS.red};
  font-weight: ${({ isFull }) => isFull ? 'bold' : 'thin'};
`;

const EmployeeCard = styled.div`
  border: 1px solid rgba(197, 197, 197, 0.2);
  border-radius: 5px;
  padding: 0 0rem;
  display: flex;
  margin: .2rem 0 0;
  align-items: center;
  justify-content: space-between;

  img {
    width: 100%;
    max-width: 60px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 100%;
    object-fit: cover;
  }

  p {
    margin: auto .5rem;
  }

  button {
    height: 60px;
    background: ${COLORS.white};
    color: ${COLORS.red};
    transition: .15s ease;

    &:hover {
      background: ${COLORS.red};
      color: ${COLORS.white};
    }
  }
`;

export default ShiftEditorModal;