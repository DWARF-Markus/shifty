import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../styles/globals';
import { faSpinner, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { addDays, format, getWeek, startOfWeek } from 'date-fns'

export default function AppOverview({ state }) {

  const [openingDays, setOpeningDays] = useState([]);
  const [week, setWeek] = useState('');
  const [firstDayOfWeek, setFirstDayOfWeek] = useState('');

  const daysArr = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const shifts = [
    {
      id: 1,
      day: 'Tuesday',
      startTime: '2020-12-01 08:00:00',
      endTime: '2020-12-01 12:00:00',
      length: 4,
    },
    {
      id: 2,
      day: 'Tuesday',
      startTime: '2020-12-01 12:30:00',
      endTime: '2020-12-01 15:30:00',
      length: 4,
    },
    {
      id: 3,
      day: 'Sunday',
      startTime: '2020-12-01 08:30:00',
      endTime: '2020-12-01 12:30:00',
      length: 6,
    },
    {
      id: 4,
      day: 'Saturday',
      startTime: '2020-12-01 15:30:00',
      endTime: '2020-12-01 19:30:00',
      length: 6,
    },
    {
      id: 5,
      day: 'Monday',
      startTime: '2020-12-01 15:30:00',
      endTime: '2020-12-01 19:30:00',
      length: 6,
    }
  ]

  useEffect(() => {
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
    }
  }, [state]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <OverviewWrapper>
        <h3>Overview</h3>
        <p>{week ? week : 'Loading week...'}</p>
        <Overview>
          {openingDays ? openingDays.map((day, index) => {
            return (
              <DayWrapper>
                <DayHeader key={index}>
                  <div>
                    <span>{day.dayName}</span>
                    <p>{day.date}</p>
                  </div>
                </DayHeader>
                <DayContent>
                  {shifts.map((shift) => {
                    if (shift.day === day.dayName) {
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
          }) : 'Loading...'}
        </Overview>
      </OverviewWrapper>
    </motion.div>
  )
}

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

const DayWrapper = styled.div`
  background-color: ${COLORS.white};
  height: 25rem;
  width: 100%;
  border-left: 1px solid ${COLORS.darkGray};

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