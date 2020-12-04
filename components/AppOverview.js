import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS, BP } from '../styles/globals';
import { faSpinner, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ShiftForm from './ShiftForm';
import { useDispatch } from 'react-redux';

import { addDays, format, getWeek, startOfWeek } from 'date-fns'

export default function AppOverview({ state }) {

  const [loading, setLoading] = useState(true);
  const [openingDays, setOpeningDays] = useState([]);
  const [week, setWeek] = useState('');
  const [firstDayOfWeek, setFirstDayOfWeek] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(async () => {
    if (state.loginData.days && openingDays.length === 0) {
      const days = state.loginData.days.split('');
      const today = new Date();
      const weekFirstDay = addDays(startOfWeek(today), 1);

      setWeek(getWeek(today));
      setFirstDayOfWeek(weekFirstDay);

      days.map((day, index) => {
        const futureDate = addDays(new Date(weekFirstDay), index);

        if (parseInt(day)) {
          setOpeningDays(prev => [...prev, { dayName: daysArr[index], dayIndex: index, date: (index === 0 ? format(weekFirstDay, 'dd. MMM') : format(futureDate, 'dd. MMM')), active: true }]);
        } else {
          setOpeningDays(prev => [...prev, { dayName: daysArr[index], dayIndex: index, date: (index === 0 ? format(weekFirstDay, 'dd. MMM') : format(futureDate, 'dd. MMM')), active: false }]);
        }
      });

      const companyId = state.loginData.id;

      await fetch(`/api/getshifts?company=${parseInt(companyId)}`)
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: 'SET_SHIFTS',
            payload: data.result
          });
          setLoading(false);
        });

    }
  }, [state]);

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

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <OverviewOverlay show={state.shiftModalOpen} onClick={(e) => handleModalClose(e)}>
        <OverviewModal>
          <ShiftForm />
        </OverviewModal>
      </OverviewOverlay>
      <OverviewWrapper>
        <h3>Overview</h3>
        {/* <p>{week ? week : ''}</p> */}
        <Overview>
          {!loading ? openingDays.map((day, index) => {
            return (
              <DayWrapper active={day.active}>
                <DayHeader key={index}>
                  <div>
                    <span>{day.dayName}</span>
                    <p>{day.date}</p>
                  </div>
                </DayHeader>
                <DayContent>
                  {state.shifts.map((shift) => {
                    if (format(new Date(shift.startTime), 'iiii') === day.dayName && day.active) {
                      return (
                        <Shift>
                          <p>{format(new Date(shift.startTime), 'HH:mm')} <FontAwesomeIcon icon={faLongArrowAltRight} /> {format(new Date(shift.endTime), 'HH:mm')}</p>
                        </Shift>
                      );
                    }
                  })}
                </DayContent>
              </DayWrapper>
            );
          }) : <OverViewPreLoader><FontAwesomeIcon class="spinner-animation" width={'30px'} icon={faSpinner} /> </OverViewPreLoader>}
        </Overview>
        <OverviewButtonWrapper active={state.shiftModalOpen}>
          <button onClick={(e) => handleModalClick(e)}>+</button>
        </OverviewButtonWrapper>
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

  &:first-of-type {
    border-left: none;
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

const Shift = styled.div`
  text-align: center;
  position: relative;
  margin: .3rem;
  height: 5rem;
  border-radius: 5px;
  border-left: 5px solid ${COLORS.green};
  background-color: ${COLORS.lightGray};
  color: ${COLORS.black};
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
  }

  &:hover {
    background-color: ${COLORS.darkGray};
    color: ${COLORS.black};
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