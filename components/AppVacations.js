import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import InputField from './InputField';

export default function AppVacations() {

  const GET_STATE = useSelector((state) => state);

  const handleVacationSubmit = async () => {
    console.log('triggered')
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
              <p>Overview</p>
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

const VacationOverview = styled.div``;