import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, BP } from '../styles/globals';
import { faSpinner, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { addDays, addWeeks, format, getISOWeek, isToday, startOfWeek } from 'date-fns';

import ShiftForm from './ShiftForm';
import EmployeeCard from './EmployeeCard';
import ShiftCard from './ShiftCard';
import ShiftEditorModal from './ShiftEditorModal';

export default function AppOverview({ state }) {
  const [loading, setLoading] = useState(true);
  const [openingDays, setOpeningDays] = useState([]);
  const [week, setWeek] = useState('');
  const [firstDayOfWeek, setFirstDayOfWeek] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [noCompany, setNoCompany] = useState(false);
  const [acceptCompanyModal, setAcceptCompanyModal] = useState(false);
  const dispatch = useDispatch();
  const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(async () => {
    if (state.loginData.days && openingDays.length === 0 || state.loginData.hasOwnProperty("companyForeign") && openingDays.length === 0) {
      if (state.loginData.companyId === null) {
        setNoCompany(true);
        return
      };
      if (state.loginData.companyId && !state.loginData.acceptedCompany) {
        setAcceptCompanyModal(true);
      }
      const days = state.isAdmin ? state.loginData.days.split('') : state.loginData.companyForeign.days.split('');
      const today = new Date();
      const weekFirstDay = startOfWeek(today, { weekStartsOn: 1 });

      setWeek(getISOWeek(today, { weekStartsOn: 1 }));
      setFirstDayOfWeek(weekFirstDay);

      days.map((day, index) => {
        const futureDate = addDays(new Date(weekFirstDay), index);

        if (parseInt(day)) {
          setOpeningDays(prev => [...prev, { trueDate: futureDate, dayName: daysArr[index], dayIndex: index, date: (index === 0 ? format(weekFirstDay, 'dd. MMM') : format(futureDate, 'dd. MMM')), active: true }]);
        } else {
          setOpeningDays(prev => [...prev, { trueDate: futureDate, dayName: daysArr[index], dayIndex: index, date: (index === 0 ? format(weekFirstDay, 'dd. MMM') : format(futureDate, 'dd. MMM')), active: false }]);
        }
      });

      const companyId = state.isAdmin ? state.loginData.id : state.loginData.companyForeign.id;

      await fetch(`/api/company/shifts?company=${parseInt(companyId)}`)
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'SET_SHIFTS',
            payload: data.result
          });
          setLoading(false);
        });

      await fetch(`/api/company/employees?company=${companyId}`)
        .then(res => res.json())
        .then(data => {
          if (data.result.length > 0) {
            setEmployees(data.result);
          }
        })
    }
  }, [state]);

  const handleNextWeekClick = async () => {
    setFirstDayOfWeek(addWeeks(firstDayOfWeek, 1));
    
    const weekFirstDay = startOfWeek(addWeeks(firstDayOfWeek, 1), { weekStartsOn: 1 });
    
    setWeek(getISOWeek(weekFirstDay, { weekStartsOn: 1 }));

    const days = state.isAdmin ? state.loginData.days.split('') : state.loginData.companyForeign.days.split('');

    setOpeningDays([]);

    days.map((day, index) => {
      const futureDate = addDays(new Date(weekFirstDay), index);

      if (parseInt(day)) {
        setOpeningDays(prev => [...prev, { trueDate: futureDate, dayName: daysArr[index], dayIndex: index, date: (index === 0 ? format(weekFirstDay, 'dd. MMM') : format(futureDate, 'dd. MMM')), active: true }]);
      } else {
        setOpeningDays(prev => [...prev, { trueDate: futureDate, dayName: daysArr[index], dayIndex: index, date: (index === 0 ? format(weekFirstDay, 'dd. MMM') : format(futureDate, 'dd. MMM')), active: false }]);
      }
    });
  }

  const handlePrevWeekClick = async () => {
    setFirstDayOfWeek(addWeeks(firstDayOfWeek, -1));

    const weekFirstDay = startOfWeek(addWeeks(firstDayOfWeek, -1), { weekStartsOn: 1 });

    setWeek(getISOWeek(weekFirstDay, { weekStartsOn: 1 }));

    const days = state.isAdmin ? state.loginData.days.split('') : state.loginData.companyForeign.days.split('');

    setOpeningDays([]);

    days.map((day, index) => {
      const futureDate = addDays(new Date(weekFirstDay), index);

      if (parseInt(day)) {
        setOpeningDays(prev => [...prev, { trueDate: futureDate, dayName: daysArr[index], dayIndex: index, date: (index === 0 ? format(weekFirstDay, 'dd. MMM') : format(futureDate, 'dd. MMM')), active: true }]);
      } else {
        setOpeningDays(prev => [...prev, { trueDate: futureDate, dayName: daysArr[index], dayIndex: index, date: (index === 0 ? format(weekFirstDay, 'dd. MMM') : format(futureDate, 'dd. MMM')), active: false }]);
      }
    });
  }

  const handleModalClick = (e) => {
    dispatch({
      type: 'SET_SHIFT_MODAL',
      payload: true
    });
  }

  const handleModalClose = (e) => {
    if (e.target.classList[0] && e.target.classList[0].includes('OverviewOverlay')) {
      dispatch({
        type: 'SET_SHIFT_MODAL',
        payload: false
      })
      dispatch({
        type: 'SET_SHIFT_MODAL_OPEN',
        payload: false
      })
    }
  }

  const handleCompanyAccept = async () => {
    await fetch(`/api/employee/accept?id=${state.loginData.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setAcceptCompanyModal(false);
        }
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <OverviewOverlay show={state.shiftModalOpen || state.shiftEditorModalOpen} onClick={(e) => handleModalClose(e)}>
        {state.shiftModalOpen ?
          <>
            <OverviewModal brightMode={state.toggleLightBright}>
              <ShiftForm brightMode={state.toggleLightBright} />
            </OverviewModal>
          </>
          : ''}
        {state.shiftEditorModalOpen ? <ShiftEditorModal brightMode={state.toggleLightBright} active={state.shiftEditorModalOpen} shiftObj={state.shiftGettingEdited} employeesList={employees} /> : ''}
      </OverviewOverlay>
      <OverviewWrapper>
        <OverviewTop brightMode={state.toggleLightBright}>
          <h3>Overview</h3>
          {state.isAdmin ?
            <EmployeesBox brightMode={state.toggleLightBright}>
              {employees ? employees.map((employee) => {
                if (employee.acceptedCompany) {
                  return (
                    <EmployeeCard brightMode={state.toggleLightBright} key={employee.id} id={employee.id} firstName={employee.firstName} lastName={employee.lastName} image={employee.profileImage} vacations={employee.EmployeeVacation} />
                  )
                }
              }) : ''}
            </EmployeesBox>
            : ''}
        </OverviewTop>
        <Overview>
          {!loading && !acceptCompanyModal ? openingDays.map((day, index) => {
            return (
              <DayWrapper brightMode={state.toggleLightBright} today={isToday(new Date(day.trueDate))} active={day.active}>
                <DayHeader brightMode={state.toggleLightBright} key={index}>
                  <div>
                    <span>{day.dayName}</span>
                    <p>{day.date}</p>
                  </div>
                </DayHeader>
                <DayContent>
                  {state.shifts.map((shift) => {
                    if (format(new Date(shift.startTime), 'iiii') === day.dayName && day.active && format(new Date(day.trueDate), 'dd/MMM') === format(new Date(shift.startTime), 'dd/MMM')) {
                      return (
                        <ShiftCard brightMode={state.toggleLightBright} loginData={state.loginData} userId={state.loginData.id} companyId={state.loginData.companyId} isAdmin={state.isAdmin} key={shift.id} employeesList={employees} shift={shift} />
                      );
                    }
                  })}
                </DayContent>
              </DayWrapper>
            );
          }) : (
              <OverViewPreLoader>
                {acceptCompanyModal ? (
                  <div style={{ textAlign: 'center' }}>
                    <p>You have been invited to join {state.loginData.companyForeign.name}.</p>
                    <button onClick={() => handleCompanyAccept()} className="btn--primary">Accept</button>
                  </div>
                ) : ''}
                {noCompany ? <p>You have not been assigned to a company yet.</p> : ''}
                {!acceptCompanyModal && !noCompany ? <FontAwesomeIcon className="spinner-animation" width={'30px'} icon={faSpinner} /> : ''}
              </OverViewPreLoader>
            )}
        </Overview>
        <ShiftExplainer brightMode={state.toggleLightBright}>
          {state.isAdmin ? (
            <>
              <div>
                <img src={require(state.toggleLightBright ? '../assets/icon-admin-red.svg' : '../assets/icon-admin-red-dark.svg')} alt="explainer" />
                <p>Needs employees</p>
              </div>
              <div>
                <img src={require(state.toggleLightBright ? '../assets/icon-admin-green.svg' : '../assets/icon-admin-green-dark.svg')} alt="explainer" />
                <p>Full</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <img src={require('../assets/icon-employee-orange.svg')} alt="explainer" />
                <p>Assigned</p>
              </div>
              <div>
                <img src={require(state.toggleLightBright ? '../assets/icon-employee-half-orange.svg' : '../assets/icon-employee-half-orange-dark.svg')} alt="explainer" />
                <p>Available</p>
              </div>
              <div>
                <img src={require(state.toggleLightBright ? '../assets/icon-employee-white.svg' : '../assets/icon-employee-dark.svg')} alt="explainer" />
                <p>Full</p>
              </div>
            </>
          )}

        </ShiftExplainer>
        <OverviewWeekButtons brightMode={state.toggleLightBright}>
          <button onClick={() => handlePrevWeekClick()}><FontAwesomeIcon icon={faCaretLeft} /></button>
          <p>{week}</p>
          <button onClick={() => handleNextWeekClick()}><FontAwesomeIcon icon={faCaretRight} /></button>
        </OverviewWeekButtons>
        {state.isAdmin ? (
          <OverviewButtonWrapper active={state.shiftModalOpen}>
            <button onClick={(e) => handleModalClick(e)}>+</button>
          </OverviewButtonWrapper>
        ) : ''}
      </OverviewWrapper>
    </motion.div>
  )
}

const OverviewOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  transition: .15s ease;
  background-color: rgba(129, 129, 129, .7);
  opacity: ${({ show }) => show ? '1' : '0'};
  pointer-events: ${({ show }) => show ? 'all' : 'none'};
  display: grid;
  align-content: center;
  justify-items: center;
`;

const OverviewModal = styled.div`
  width: 100%;
  max-width: 620px;
  height: auto;
  background-color: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
  padding: 1rem;
  border: 1px solid ${({ brightMode }) => brightMode ? COLORS.lightGray : COLORS.black};
  z-index: 300;
`;

const OverviewWrapper = styled.div`
  -webkit-user-select: none;     
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const OverviewTop = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;
  
  h3 {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    font-weight: 300;
    line-height: 1.2;
  }

  @media (min-width: ${BP.small}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const EmployeesBox = styled.div`
  width: 100%;
  background: ${({ brightMode }) => brightMode ? COLORS.lightGray : 'transparent'};
  height: 3rem;
  margin-bottom: 2rem;
  border-radius: 5px;
  display: flex;
  overflow-y: scroll;

  @media (min-width: ${BP.small}) {
    margin-bottom: 0;
  }
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-around;
`;

const OverViewPreLoader = styled.div`
  background-color: '#e3e3e3';
  height: 25rem;
  width: 100%;
  display: grid;
  align-content: center;
  justify-items: center;

  svg {
    color: ${COLORS.darkGray};
  }
`;

const DayWrapper = styled.div`
  pointer-events: ${({ active }) => active ? 'all' : 'none'};
  height: 25rem;
  width: 100%;
  border-left: 1px solid ${({ brightMode }) => brightMode ? COLORS.darkGray : '#2a2a2a'};
  display: ${({ active }) => !active ? 'none' : 'block'};
  position: relative;

  ${props => props.active && `
     background-color: ${props.brightMode ? COLORS.white : COLORS.black}; 
  `};

  ${props => !props.active && `
    background-color: ${props.brightMode ? '#e3e3e3' : '#434343'}; 
  `};

  @media (min-width: ${BP.small}) {
    display: block;
  }

  &:first-of-type {
    border-left: none;
  }

  &::before {
    content: 'TODAY';
    position: absolute;
    height: .5rem;
    line-height: 1.2;
    font-size: 8px;
    font-family: Quicksand, sans-serif;
    width: 100%;
    padding: 5px 0;
    top: -20px;
    left: -1px;
    box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    text-align: center;
    display: ${({ today }) => today ? 'block' : 'none'};
    background-color: ${COLORS.orange};
    border: 1px solid ${COLORS.orange};
    color: ${COLORS.white};
  }
`;

const DayHeader = styled.div`
  text-align: center;
  border-bottom: 1px solid ${({ brightMode }) => brightMode ? COLORS.darkGray : '#2a2a2a'};
  color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};

  div {
    padding: 6px 0 0 0;
  }

  span {
    font-size: 12px;
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    font-weight: 600;
  }

  p {
    margin: 0px 0 5px 0;
    font-size: 11px;
    color: ${COLORS.darkGray};
    text-transform: lowercase;
  }
`;

const DayContent = styled.div``;

const ShiftExplainer = styled.div`
  display: flex;
  position: relative;

  @media (min-width: ${BP.small}) {
    position: absolute;
  }

  div {
    display: flex;
    margin: 0 0.5rem;

    p {
      color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    }

    img {
      max-width: 15px;
      margin: 0 0.2rem;
    }
  }
`;

const OverviewButtonWrapper = styled.div`
  position: fixed;
  right: 1rem;
  bottom: calc(1rem + 50px);
  z-index: 200;
  transition: .2s ease;
  transform: ${({ active }) => active ? 'rotate(-45deg)' : 'rotate(0deg)'};
  transform-origin: center;
  pointer-events: ${({ active }) => active ? 'none' : 'all'};
  cursor: pointer;

  button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    font-size: 18px;
    background-color: ${({ active }) => active ? COLORS.red : COLORS.orange};
    color: ${COLORS.white};

    &:hover {
      background-color: ${COLORS.white};
      color: ${COLORS.orange};
    }
  }

  @media (min-width: ${BP.small}) {
    bottom: 1rem;
  }
`;

const OverviewWeekButtons = styled.div`
    align-items: center;
    display: flex;
    justify-content: center;
    margin-top: 5px;

    p {
      font-size: 20px;
      margin: 0;
      color: ${({ brightMode }) => brightMode ? COLORS.orange : COLORS.white};
    }

    button {
      background-color: transparent;
      svg {
        color: ${({ brightMode }) => brightMode ? COLORS.orange : COLORS.white};
        width: 30px!important;
        height: 30px;
      }
    }
`;