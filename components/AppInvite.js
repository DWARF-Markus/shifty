import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BP, COLORS } from '../styles/globals';
import { useSelector, useDispatch } from 'react-redux';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function AppInvite() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const GET_STATE = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(async () => {
    const companyId = GET_STATE.loginData.id;
    await fetch(`/api/company/employees?company=${companyId}`)
      .then(res => res.json())
      .then(data => {
        if (data.result.length > 0) {
          setSelectedUsers(data.result);
          setLoading(false);
        }
      })

    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, [])

  const handleUsersSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      await fetch(`/api/user/all?query=${e.target.value}`)
        .then(res => res.json())
        .then(data => {
          setUsers(data.result);
        })
    }
  }

  const handleEmployeeSelect = async (user) => {
    const companyId = GET_STATE.loginData.id;
    const employeeId = user.id;

    setSelectedUsers(selectedUsers.concat([user]));
    setQuery('');

    await fetch(`/api/company/invite?company=${companyId}&employee=${employeeId}`)
      .then(res => res.json())
      .then(data => {
        dispatch({
          type: 'SET_POP_UP',
          payload: 'Invite has been sent!'
        })
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <InviteWrapper brightMode={GET_STATE.toggleLightBright}>
        <h3>Invite people to your workspace</h3>
        <InviteSearchWrapper>
          <input className="shifty__search" onChange={(e) => handleUsersSearch(e)} value={query} type="search" placeholder="Search users ..." />
          <SearchResults show={users.length > 0 && query.length > 0}>
            {users.map((user) => {
              return <EmployeeEntry alreadySelected={user.companyId === GET_STATE.loginData.id} onClick={() => handleEmployeeSelect(user)} key={user.id}><p>{user.firstName} {user.lastName}</p><span>{user.email}</span></EmployeeEntry>
            }
            )}
          </SearchResults>
        </InviteSearchWrapper>
        <InviteOverview brightMode={GET_STATE.toggleLightBright}>
          <OverviewHead>
            <p>Name</p>
            <p>Email</p>
            <p>Status</p>
          </OverviewHead>
          <OverviewContent>
            {!loading ? selectedUsers.map((user) => {
              return (<div>
                <p key={user.id}>{user.firstName} {user.lastName}</p>
                <p>{user.email}</p>
                <p>{user.acceptedCompany ? 'Accepted' : 'Not accepted'}</p>
              </div>)
            }) : <Loader><FontAwesomeIcon className="spinner-animation" width={'30px'} icon={faSpinner} /></Loader>}
            <p>{setSelectedUsers.length === 0 ? 'No employees yet.' : ''}</p>
          </OverviewContent>
        </InviteOverview>
      </InviteWrapper>
    </motion.div>
  )
}

const InviteWrapper = styled.div`
  h3 {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white}; 
    font-weight: 300;
    line-height: 1.2;
  }
`;

const InviteSearchWrapper = styled.div`
  position: relative;

@media (min-width: ${BP.small}) {
  max-width: 500px;
  }
`;

const SearchResults = styled.div`
  position: absolute;
  width: 100%;
  margin: 0 10px;
  z-index: 1;
  display: ${({ show }) => show ? 'block' : 'none'};
  background-color: ${COLORS.white};
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
  margin: 0px;
  border-bottom: 1px solid ${COLORS.lightGray};

  li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    transition: .2s ease;
    background-color: ${COLORS.white};
    color: ${COLORS.black};
    padding: 0 10px;

    &:hover {
      background-color: ${COLORS.orange};
      color: ${COLORS.white};
    }
  }
`;

const InviteOverview = styled.div`
  width: 100%;
  min-height: 10rem;
  height: auto;
  background: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
  color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
  border-radius: 5px;
  margin-top: 2rem;
  padding: 0 10px;
`;

const OverviewHead = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid ${COLORS.lightGray};
`;

const OverviewContent = styled.div`
  position: relative;

  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const EmployeeEntry = styled.li`
  pointer-events: ${({ alreadySelected }) => alreadySelected ? 'none' : 'all'};
  opacity: ${({ alreadySelected }) => alreadySelected ? '0.3' : '1'};
`;

const Loader = styled.div`
  position: absolute;
  margin: 0 auto;
  height: 6rem;
  width: 300%;
  display: grid;
  align-items: center;
  justify-items: center;

  svg {
    color: ${COLORS.darkGray};
  }
`;