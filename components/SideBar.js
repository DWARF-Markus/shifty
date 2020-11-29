import { useState } from 'react';
import styled from 'styled-components';
import { COLORS, BP } from '../styles/globals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faHome, faUsers, faPaperclip, faSun, faCircle, faList, faPaperPlane, faUser, faCrown } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { signOut } from 'next-auth/client';
import Link from 'next/link';

const SideBar = ({ state }) => {

  const [toggle, setToggle] = useState(true);
  const [activePage, setActivePage] = useState('Overview');
  const dispatch = useDispatch();

  const handleToggle = () => {
    setToggle(!toggle);
    dispatch({
      type: 'SET_SIDEBAR_TOGGLE',
      payload: !toggle,
    });
  }

  const handleNavClick = (e) => {
    setActivePage(e);
    dispatch({
      type: 'SET_ACTIVE_APP_PAGE',
      payload: e,
    });
  }

  return (
    <SideBarWrapper toggle={toggle}>
      <SideBarHeader toggle={toggle}>
        {toggle ? <h3>{state.isAdmin ? <FontAwesomeIcon style={{ width: '10px' }} icon={faCrown} /> : ''} {state.loginData.name || state.loginData.firstName}</h3> : <h3></h3>}
        <button onClick={() => handleToggle()}>
          <FontAwesomeIcon style={{ width: '10px', color: COLORS.lightGray }} icon={faAngleLeft} />
        </button>
      </SideBarHeader>
      <SideBarNav toggle={toggle}>
        <SidebarEntry active={activePage === 'Overview'} onClick={() => handleNavClick('Overview')}>
          <FontAwesomeIcon style={{ width: '18px' }} icon={faHome} />
          <p>Overview</p>
        </SidebarEntry>
        {state.isAdmin ? <>
          <SidebarEntry active={activePage === 'Employees'} onClick={() => handleNavClick('Employees')}>
            <FontAwesomeIcon style={{ width: '18px' }} icon={faUsers} />
            <p>Employees</p>
          </SidebarEntry>
          <SidebarEntry active={activePage === 'Templates'} onClick={() => handleNavClick('Templates')}>
            <FontAwesomeIcon style={{ width: '18px' }} icon={faPaperclip} />
            <p>Templates</p>
          </SidebarEntry>
        </> : ''}
        <SidebarEntry active={activePage === 'Vacations'} onClick={() => handleNavClick('Vacations')}>
          <FontAwesomeIcon style={{ width: '18px' }} icon={faSun} />
          <p>Vacations</p>
        </SidebarEntry>
        <SidebarEntry active={activePage === 'Notifications'} onClick={() => handleNavClick('Notifications')}>
          <FontAwesomeIcon style={{ width: '18px' }} icon={faCircle} />
          <p>Notifications</p>
        </SidebarEntry>
        <SidebarEntry active={activePage === 'Settings'} onClick={() => handleNavClick('Settings')}>
          <FontAwesomeIcon style={{ width: '18px' }} icon={faList} />
          <p>Settings</p>
        </SidebarEntry>

        <SideBarBottom>
          {state.isAdmin ? <>
            <SidebarEntry show={state.isAdmin} active={activePage === 'Invite'} onClick={() => handleNavClick('Invite')}>
              <FontAwesomeIcon style={{ width: '18px' }} icon={faPaperPlane} />
              <p>Invite</p>
            </SidebarEntry>
          </> : ''}
          <SidebarEntry onClick={signOut}>
            <FontAwesomeIcon style={{ width: '18px' }} icon={faUser} />
            <p>Sign out</p>
          </SidebarEntry>
        </SideBarBottom>
      </SideBarNav>
    </SideBarWrapper>
  );
}

const SideBarWrapper = styled.div`
  width: ${({ toggle }) => toggle ? '12rem' : '4rem'};
  min-height: calc(100vh - 75px);
  background-color: ${COLORS.black};
  transition: .15s ease;
  position: fixed;
  display: none;

  @media (min-width: ${BP.small}) {
    display: block;
  }
`;

const SideBarHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 1rem 16px;
  position: absolute;

  h3 {
    opacity: ${({ toggle }) => toggle ? 1 : 0};
    width: ${({ toggle }) => toggle ? 'auto' : '0'};
    transition: .3s ease;
    margin: 0;
    font-size: 10px;
    color: ${COLORS.lightGray};
  }

  button {
    background: transparent;
    transform: ${({ toggle }) => toggle ? 'rotate(0deg)' : 'rotate(-180deg)'};
    transition: .3s ease;
    margin: ${({ toggle }) => toggle ? 'none' : '0 auto'};
    margin-left: auto;
  }
`;

const SideBarNav = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: calc(100% - 54px);
  margin-top: 50px;

  div {
    svg {
      margin: ${({ toggle }) => toggle ? '0 10px' : '0 0 0 18px'};
      transition: .3s ease;
    }
    p {
      transition: .2s ease;
      display: ${({ toggle }) => toggle ? 'block' : 'none'};
      position: absolute;
      left: 40px;
      white-space: pre;
    }
  }
`;

const SidebarEntry = styled.div`
  color: ${({ active }) => active ? COLORS.orange : COLORS.white};
  display: flex;
  align-items: center;
  height: 50px;
  border-left: ${({ active }) => active ? `3px solid ${COLORS.orange}` : `3px solid ${COLORS.black}`}; 
  cursor: pointer;

  svg {
    color: ${({ active }) => active ? COLORS.orange : COLORS.white};
  }
`;

const SideBarBottom = styled.div`
  margin-top: auto;
  position: absolute;
  bottom: 0;
`;

export default SideBar;