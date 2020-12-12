import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import InputField from './InputField';
import { COLORS } from '../styles/globals';
import { format } from 'date-fns';

export default function AppVacations() {

  const [vacations, setVacations] = useState([]);

  const dispatch = useDispatch();
  const GET_STATE = useSelector((state) => state);

  useEffect(async () => {
    await fetch(`/api/getuservacations?id=${GET_STATE.loginData.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 201) {
          setVacations(data.response);
        }
      })
  }, [])

  const handleVacationSubmit = async () => {
    await fetch('/api/addvacationtouser', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify({
        data: {
          employeeId: GET_STATE.loginData.id,
          startDate: GET_STATE.vacationStart,
          endDate: GET_STATE.vacationEnd
        }
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 201) {
          dispatch({
            type: 'CLEAR_VACATION',
          })
          dispatch({
            type: 'SET_POP_UP',
            payload: 'Vacation request sent!'
          })
          setVacations(vacations.concat([data.response]));
        }
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <VacationsWrapper>
        <VacationsTop>
          <h3>{GET_STATE.isAdmin ? 'Vacations' : 'Register your vacation'}</h3>
          {GET_STATE.isAdmin ? <></> : (
            <>
              <InputField type="date" label="Start date" getter="vacationStart" setter="SET_VACATION_START" />
              <InputField type="date" label="End date" getter="vacationEnd" setter="SET_VACATION_END" />
              <button onClick={() => handleVacationSubmit()} className="btn--primary">Submit</button>
            </>
          )}
        </VacationsTop>
        <VacationOverview>
          {GET_STATE.isAdmin ? <></> : (
            <>
              <OverviewHead>
                <div>
                  <p>Start</p>
                </div>
                <div>
                  <p>End</p>
                </div>
                <div>
                  <p>Status</p>
                </div>
              </OverviewHead>
              <OverviewBody>
                {vacations.length > 0 ? vacations.map((vacation) => {
                  return (
                    <VacationCard>
                      <div>
                        <p>{format(new Date(vacation.dateStart), 'dd. MMM yyyy')}</p>
                      </div>
                      <div>
                        <p>{format(new Date(vacation.dateEnd), 'dd. MMM yyyy')}</p>
                      </div>
                      <div>
                        {vacation.approved ? <p>Approved</p> : <p>Not approved</p>}
                      </div>
                    </VacationCard>
                  )
                }) : <p>No vacations yet.</p>}
              </OverviewBody>
            </>
          )}
        </VacationOverview>
      </VacationsWrapper>
    </motion.div>
  )
}

const VacationsWrapper = styled.div``;

const VacationsTop = styled.div`
  h3 {
    font-weight: 300;
    line-height: 1.2;
  }
`;

const VacationOverview = styled.div`
  width: 100%;
  max-width: 35rem;
  background-color: ${COLORS.white};
  margin-top: 1rem;
  border: 1px solid ${COLORS.darkGray};
`;

const OverviewHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  div {
    border-right: 1px solid rgba(197, 197, 197, .3);
    border-bottom: 1px solid ${COLORS.darkGray};
    height: 2rem;
    display: grid;
    align-items: center;
    padding: 0 .5rem;

    p {
      margin: 0;
    }
  }

  div:last-of-type {
    border-right: none;
  }

`;

const OverviewBody = styled.div`

`;

const VacationCard = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid rgba(197, 197, 197, .3);

  div {
    border-right: 1px solid rgba(197, 197, 197, .3);

    p {
      padding: 0 .5rem;
    }
  }

  div:last-of-type {
    border-right: none;
  }

  &:last-of-type {
    border-bottom: none;
  }
`;