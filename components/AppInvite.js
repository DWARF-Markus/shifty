import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { BP, COLORS } from '../styles/globals';
import { useSelector } from 'react-redux';

export default function AppInvite() {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const GET_STATE = useSelector((state) => state);

  useEffect(async () => {
    const companyId = GET_STATE.loginData.id;
    await fetch(`/api/getcompanyusers?company=${companyId}`)
      .then(res => res.json())
      .then(data => {
        if (data.result.length > 0) {
          setSelectedUsers(data.result);
        }
        console.log(data);
      })
  }, [])

  const handleUsersSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value.length > 0) {
      await fetch(`/api/getusers?query=${e.target.value}`)
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

    await fetch(`/api/addusertocompany?company=${companyId}&employee=${employeeId}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
      })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <InviteWrapper>
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
        <InviteOverview>
          <OverviewHead>
            <p>Name</p>
            <p>Email</p>
            <p>Status</p>
          </OverviewHead>
          <OverviewContent>
            {selectedUsers.map((user) => {
              return (<div>
                <p key={user.id}>{user.firstName} {user.lastName}</p>
                <p>{user.email}</p>
                <p>status</p>
              </div>)
            })}
          </OverviewContent>
        </InviteOverview>
      </InviteWrapper>
    </motion.div>
  )
}

const InviteWrapper = styled.div`
  h3 {
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
  background: ${COLORS.white};
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
  div {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const EmployeeEntry = styled.li`
  pointer-events: ${({ alreadySelected }) => alreadySelected ? 'none' : 'all'};
  opacity: ${({ alreadySelected }) => alreadySelected ? '0.3' : '1'};
`;