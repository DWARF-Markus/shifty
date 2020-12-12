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
    if (!GET_STATE.isAdmin) {
      await fetch(`/api/getuservacations?id=${GET_STATE.loginData.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 201) {
            setVacations(data.response);
          }
        })
    } else {
      await fetch(`/api/getcompanyvacations?id=${GET_STATE.loginData.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === 201) {
            setVacations(data.response);
          }
        })
    }
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

  const handleVacationAccept = async (id) => {
    await fetch(`/api/acceptvacation?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          const index = vacations.findIndex((vacations) => vacations.id === id);
          const newArr = [...vacations];

          newArr[index].approved = true;

          setVacations(newArr);

          dispatch({
            type: 'SET_POP_UP',
            payload: 'Vacation accepted!'
          })
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
          {GET_STATE.isAdmin && vacations ? (
            <>
              <AdminOverviewHead>
                <div>
                  <p>Employee</p>
                </div>
                <div>
                  <p>Start</p>
                </div>
                <div>
                  <p>End</p>
                </div>
                <div>
                  <p>Status</p>
                </div>
              </AdminOverviewHead>
              <AdminOverviewContent>
                {vacations.map((vacation) => {
                  return (
                    <AdminVacationCard>
                      <div className="employee">
                        <img src={vacation.Employee.profileImage ? vacation.Employee.profileImage : require('../assets/icon-dot-orange.svg')} />
                        <p>{vacation.Employee.firstName} {vacation.Employee.lastName}</p>
                      </div>
                      <div>
                        <p>{format(new Date(vacation.dateStart), 'dd. MMM yyyy')}</p>
                      </div>
                      <div>
                        <p>{format(new Date(vacation.dateEnd), 'dd. MMM yyyy')}</p>
                      </div>
                      <div className="cta">
                        {vacation.approved ? <p>Approved</p> : <button onClick={() => handleVacationAccept(vacation.id)} className="btn--secondary btn--success">Accept</button>}
                      </div>
                    </AdminVacationCard>
                  )
                })}
              </AdminOverviewContent>
            </>
          ) : (
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
    max-width: 45rem;
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

const AdminOverviewHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
    
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

const AdminOverviewContent = styled.div`
  min-height: 20rem;
`;

const AdminVacationCard = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    border-bottom: 1px solid rgba(197, 197, 197, .3);
  
  div {
        border-right: 1px solid rgba(197, 197, 197, .3);
  
    p {
        padding: 0 .5rem;
    }
  }

  .employee {
    display: flex;
    padding-left: .3rem;
    align-items: center;

    img {
      max-width: 25px;
      min-width: 25px;
      height: 25px;
      object-fit: cover;
      border-radius: 50%;
    }
  }

  .cta {
    display: grid;
    align-content: center;
    justify-items: center;
  }

  div:last-of-type {
        border-right: none;
    }
  
  &:last-of-type {
        border-bottom: none;
    }
`;