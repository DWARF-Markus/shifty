import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BP, COLORS } from '../styles/globals';
import { useSelector, useDispatch } from 'react-redux';
import { faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistanceToNow } from 'date-fns';

export default function AppEmployee() {

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const GET_STATE = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(async () => {
    const companyId = GET_STATE.loginData.id;
    await fetch(`/api/getcompanyusers?company=${companyId}`)
      .then(res => res.json())
      .then(data => {
        if (data.result.length > 0) {
          setEmployees(data.result);
          setLoading(false);
        }
      })
  }, []);

  const handleEmployeeRemove = async (id) => {
    setSubmitting(true);
    await fetch(`/api/removeuserfromcompany?id=${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          setEmployees(employees.filter((employee) => employee.id !== id));
          dispatch({
            type: 'SET_POP_UP',
            payload: 'User has been removed.'
          })
        }
        setSubmitting(false);
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <EmployeesWrapper brightMode={GET_STATE.toggleLightBright}>
        <h3>Employees {submitting ? <span><FontAwesomeIcon className="spinner-animation" width={'15px'} icon={faSpinner} /></span> : ''}</h3>
        {loading ? <EmployeesLoader><FontAwesomeIcon className="spinner-animation" width={'30px'} icon={faSpinner} /></EmployeesLoader> : (
          <EmployeesContainer>
            {employees.map((employee) => {
              return (
                <EmployeeWrapper>
                  <EmployeeNotAccepted accepted={employee.acceptedCompany}>Not accepted yet</EmployeeNotAccepted>
                  <Employee brightMode={GET_STATE.toggleLightBright} accepted={employee.acceptedCompany}>
                    <EmployeeAdded accepted={employee.acceptedCompany}><p>Added {formatDistanceToNow(new Date(employee.acceptedCompanyDateTime))} ago</p></EmployeeAdded>
                    <EmployeeRemoveBtn onClick={() => handleEmployeeRemove(employee.id)}><FontAwesomeIcon icon={faTimes} /></EmployeeRemoveBtn>
                    <img src={employee.profileImage ? employee.profileImage : require('../assets/icon-dot-orange.svg')} alt="shifty" />
                    <EmployeeInfo>
                      <p className="name">{employee.firstName} {employee.lastName}</p>
                      <p>{employee.email}</p>
                    </EmployeeInfo>
                  </Employee>
                </EmployeeWrapper>
              );
            })
            } </EmployeesContainer>
        )}
      </EmployeesWrapper>
    </motion.div>
  )
}

const EmployeesWrapper = styled.div`
  h3 {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    font-weight: 300;
    line-height: 1.2;
  }
`;

const EmployeesContainer = styled.div`
  display: grid;
  grid-gap: 5px;
  grid-template-columns: 1fr;

  @media (min-width: ${BP.small}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const EmployeesLoader = styled.div`
  display: grid;
  align-content: center;
  justify-items: center;
  height: 15rem;

  svg {
    color: ${COLORS.darkGray};
  }
`;

const EmployeeWrapper = styled.div`
  position: relative;
`;

const Employee = styled.div`
  width: 100%;
  border-radius: 5px;
  border: ${({ brightMode }) => brightMode ? 'none' : '1px solid #242424'};
  background-color: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
  padding: 25px 5px 5px;
  display: flex;
  align-items: center;
  position: relative;
  transition: .15s ease;
  pointer-events: ${({ accepted }) => accepted ? 'all' : 'none'};
  opacity: ${({ accepted }) => accepted ? '1' : '.15'};

  p {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
  }

  img {
    width: 65px;
    height: 65px;
    object-fit: cover;
    border-radius: 50%;
  }

  &:hover {
    transform: scale(1.01);
  }
`;

const EmployeeNotAccepted = styled.h2`
  position: absolute;
  text-align: center;
  width: 100%;
  font-size: 12px;
  text-transform: uppercase;
  margin: 3px 0 0;
  color: ${COLORS.red};
`;

const EmployeeInfo = styled.div`
  margin-left: 5px;

  p {
    margin: 0;
  }

  .name {
    font-weight: 700;
  }
`;

const EmployeeRemoveBtn = styled.div`
  position: absolute;
  top: 3px;
  right: 5px;
  cursor: pointer;

  svg {
    color: ${COLORS.red};
    width: 12px;
    max-width: 12px;
  }
`;

const EmployeeAdded = styled.div`
  position: absolute;
  left: 5px;
  top: 0px;
  display: ${({ accepted }) => accepted ? 'block' : 'none'};

  p {
    margin: 0%;
    font-size: 8px;
  }
`;