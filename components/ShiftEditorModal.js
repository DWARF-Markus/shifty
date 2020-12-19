import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { COLORS, BP } from '../styles/globals';
import { faCheckCircle, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';

const ShiftEditorModal = ({ brightMode, shiftObj, employeesList }) => {

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
      transform: 'translateY(0px)',
      opacity: 1,
      transition: {
        type: "spring",
        restDelta: 2
      }
    }),
    closed: () => ({
      transform: 'translateY(20px)',
      opacity: 0,
      transition: {
        type: "spring",
        damping: 40
      },
    }),
    openTwo: () => ({
      transform: 'translateY(0px)',
      opacity: 1,
      transition: {
        type: "spring",
        restDelta: 2
      }
    }),
    closedTwo: () => ({
      transform: 'translateY(40px)',
      opacity: 0,
      transition: {
        type: "spring",
        damping: 40
      }
    })
  }

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

  const handleShiftDelete = async () => {
    await fetch(`/api/removeshift?id=${shiftObj.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          dispatch({
            type: 'SET_SHIFT_MODAL_OPEN',
            payload: false
          });
          dispatch({
            type: 'DELETE_SHIFT',
            payload: shiftObj.id
          });
          dispatch({
            type: 'SET_POP_UP',
            payload: 'Shift has been deleted.'
          });
        }
      })
  }

  return (
    <motion.div
      animate={active ? "open" : "closed"}
      variants={variants}
      transition={{ duration: 4 }}
      style={{ width: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}
    >
      <ShiftEditorContainer brightMode={brightMode}>
        <ShiftEditorHeader brightMode={brightMode}>
          <div>
            <p>{format(new Date(shiftObj.startTime), 'dd MMMM yyyy @ HH:mm')} to {format(new Date(shiftObj.endTime), 'HH:mm')}</p>
            <h1>{shiftObj.title}</h1>
          </div>
          <Employees brightMode={brightMode}>
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
          <EmployeesContainer>
            {employeesList ? employeesList.map((employee) => {
              if (employees.includes(employee.id)) {
                return (
                  <motion.div
                    animate={active ? "openTwo" : "closedTwo"}
                    variants={variants}
                    transition={{ duration: 4 }}
                  >
                    <EmployeeCard brightMode={brightMode}>
                      <img src={employee.profileImage ? employee.profileImage : require('../assets/icon-dot-orange.svg')} />
                      <div>
                        <p>{employee.firstName} {employee.lastName}</p>
                      </div>
                      <button onClick={() => handleEmployeeRemove(employee.id)}>Remove</button>
                    </EmployeeCard>
                  </motion.div>
                );
              }
            }) : ''}
          </EmployeesContainer>
        </ShiftEditorBody>
        <ShiftEditorActions brightMode={brightMode}>
          <button onClick={() => handleShiftDelete()} class="btn--danger">Delete shift</button>
        </ShiftEditorActions>
      </ShiftEditorContainer >
    </motion.div>
  );
}

const ShiftEditorContainer = styled.div`
  width: 100%;
  max-width: 45rem;
  min-height: 30rem;
  position: absolute;
  background-color: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
  border: 1px solid ${({ brightMode }) => brightMode ? COLORS.lightGray : COLORS.black};
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

  p {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    margin: 0;
    font-size: 11px;
    opacity: .6;
  }

  h1 {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
  }
`;

const EmployeesContainer = styled.div`
  overflow-y: scroll;
  min-height: 12rem;
  max-height: 12rem;
`;

const Employees = styled.div`
  display: none;
  text-align: right;
  margin: 3px 0 auto auto;

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

const ShiftEditorActions = styled.div`
  position: absolute;
  width: calc(100% - 2rem);
  bottom: 1rem;
  
  button {
    background-color: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
    float: right;
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
    max-width: 75px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    height: 100%;
    object-fit: cover;
  }

  p {
    margin: auto .5rem;

    svg {
      max-width: 15px;
      margin-right: .2rem;
    }
  }

  button {
    height: 60px;
    background: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
    color: ${COLORS.red};
    transition: .15s ease;
  }
`;

export default ShiftEditorModal;