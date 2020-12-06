import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, BP } from '../styles/globals';
import { faSpinner, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { addDays, addWeeks, format, getWeek, isToday, startOfWeek } from 'date-fns';

import ShiftForm from './ShiftForm';
import EmployeeCard from './EmployeeCard';
import ShiftCard from './ShiftCard';

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


      setWeek(getWeek(today, { weekStartsOn: 1 }));
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

      await fetch(`/api/getshifts?company=${parseInt(companyId)}`)
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'SET_SHIFTS',
            payload: data.result
          });
          setLoading(false);
        });

      await fetch(`/api/getcompanyusers?company=${companyId}`)
        .then(res => res.json())
        .then(data => {
          if (data.result.length > 0) {
            setEmployees(data.result);
          }
        })
    }
  }, [state]);

  const handleNextWeekClick = () => {
    setFirstDayOfWeek(addWeeks(firstDayOfWeek, 1));
    setWeek(prev => prev + 1);

    const weekFirstDay = startOfWeek(addWeeks(firstDayOfWeek, 1), { weekStartsOn: 1 });

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

  const handlePrevWeekClick = () => {
    setFirstDayOfWeek(addWeeks(firstDayOfWeek, -1));
    setWeek(prev => prev - 1);

    const weekFirstDay = startOfWeek(addWeeks(firstDayOfWeek, -1), { weekStartsOn: 1 });

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
    }
  }

  const handleCompanyAccept = async () => {
    await fetch(`/api/acceptcompany?id=${state.loginData.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setAcceptCompanyModal(false);
        }
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <OverviewOverlay show={state.shiftModalOpen} onClick={(e) => handleModalClose(e)}>
        <OverviewModal>
          <ShiftForm />
        </OverviewModal>
      </OverviewOverlay>
      <OverviewWrapper>
        <OverviewTop>
          <h3>Overview</h3>
          {state.isAdmin ?
            <EmployeesBox>
              {employees ? employees.map((employee) => {
                if (employee.acceptedCompany) {
                  return (
                    <EmployeeCard key={employee.id} id={employee.id} firstName={employee.firstName} lastName={employee.lastName} image={employee.profileImage} />
                  )
                }
              }) : 'No employees yet.'}
            </EmployeesBox>
            : ''}
        </OverviewTop>
        <Overview>
          {!loading && !acceptCompanyModal ? openingDays.map((day, index) => {
            return (
              <DayWrapper today={isToday(new Date(day.trueDate))} active={day.active}>
                <DayHeader key={index}>
                  <div>
                    <span>{day.dayName}</span>
                    <p>{day.date}</p>
                  </div>
                </DayHeader>
                <DayContent>
                  {state.shifts.map((shift) => {
                    if (format(new Date(shift.startTime), 'iiii') === day.dayName && day.active && format(new Date(day.trueDate), 'dd/MMM') === format(new Date(shift.startTime), 'dd/MMM')) {
                      return (
                        <ShiftCard userId={state.loginData.id} isAdmin={state.isAdmin} key={shift.id} employeesList={employees} shift={shift} />
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
        <OverviewWeekButtons>
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
  background-color: rgba(196, 196, 196, 0.5);
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
  background-color: ${COLORS.white};
  padding: 1rem;
  border: 1px solid ${COLORS.darkGray};
  z-index: 300;
`;

const OverviewWrapper = styled.div`
  h3 {
    font-weight: 300;
    line-height: 1.2;
  }
`;

const OverviewTop = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 1fr;



  @media (min-width: ${BP.small}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const EmployeesBox = styled.div`
  width: 100%;
  background: ${COLORS.white};
  height: 3rem;
  margin-bottom: 2rem;
  background-color: ${COLORS.lightGray};
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
  background-color: ${COLORS.white};
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
  background-color: ${({ active }) => active ? COLORS.white : '#e3e3e3'};
  pointer-events: ${({ active }) => active ? 'all' : 'none'};
  height: 25rem;
  width: 100%;
  border-left: 1px solid ${COLORS.darkGray};
  opacity: ${({ active }) => active ? '1' : '.4'};
  display: ${({ active }) => !active ? 'none' : 'block'};
  position: relative;

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
    width: calc(100% - 1px);
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
  border-bottom: 1px solid ${COLORS.darkGray};

  div {
    padding: 6px 0 0 0;
  }

  span {
    font-size: 10px;
    color: ${COLORS.black};
    font-weight: 600;
  }

  p {
    margin: 0px 0 5px 0;
    font-size: 9px;
    color: ${COLORS.darkGray};
    text-transform: lowercase;
  }
`;

const DayContent = styled.div`
  background-color: ${COLORS.white};
`;

const OverviewButtonWrapper = styled.div`
  position: fixed;
  right: 1rem;
  bottom: calc(1rem + 50px);
  z-index: 200;
  transition: .2s ease;
  transform: ${({ active }) => active ? 'rotate(-45deg)' : 'rotate(0deg)'};
  transform-origin: center;

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
    }

    button {
      background-color: transparent;
      svg {
        color: ${COLORS.orange};
        width: 30px!important;
        height: 30px;
      }
    }
`;