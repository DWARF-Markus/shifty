import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { COLORS, SIZES, BUTTON, BP } from '../styles/globals';
import { faTimes, faBars, faUser, faDotCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/client';
import { useSelector, useDispatch } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';

const NavBar = () => {

  const [session] = useSession();

  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dispatch = useDispatch();
  const [clicked, setClicked] = useState(2);

  const GET_STATE = useSelector((state) => state);

  const handleNotificationsOpen = async () => {

    setNotificationsOpen(!notificationsOpen);

    if (Math.abs(clicked % 2) == 1) {
      if (GET_STATE.isAdmin) {
        dispatch({
          type: 'CLEAR_NOTIFICATIONS_COUNT_ADMIN'
        })
      } else {
        dispatch({
          type: 'CLEAR_NOTIFICATIONS_COUNT_EMPLOYEE',
        })
      }
    }

    await fetch(`/api/clearnotifications?id=${GET_STATE.loginData.id}&type=${GET_STATE.isAdmin ? 'admin' : 'employee'}`)
      .then(res => res.json())
      .then(() => { })

    setTimeout(() => {
      setClicked(clicked + 1);
    }, 100);
  }

  const handleOverClick = () => {
    setNotificationsOpen(!notificationsOpen);
    setClicked(clicked + 1);

    if (Math.abs(clicked % 2) == 1) {
      if (GET_STATE.isAdmin) {
        dispatch({
          type: 'CLEAR_NOTIFICATIONS_COUNT_ADMIN'
        })
      } else {
        dispatch({
          type: 'CLEAR_NOTIFICATIONS_COUNT_EMPLOYEE',
        })
      }
    }
  }

  return (
    <>
      <NavDesktop>
        <NavSide>
          <NavImage>
            <Link href="/"><img src={require('../assets/logo-shifty-orange.svg')} alt="shifty" style={{ width: '75px' }} /></Link>
          </NavImage>
        </NavSide>
        <NavSide>
          <NavLinks>
            {session ? <>
              <WrapperLink>
                <Link href="/">Home</Link>
              </WrapperLink>
              <WrapperLink>
                <Link href="/about">About</Link>
              </WrapperLink>
              <WrapperLink>
                <Link href="/app">Overview</Link>
              </WrapperLink>
              <UserWrapper onClick={() => handleNotificationsOpen()}>
                {GET_STATE.notifications && !GET_STATE.isAdmin && GET_STATE.notifications.filter((notification) => notification.EmployeeActive).length > 0 ? <NotificationsCount>{GET_STATE.notifications.filter((notification) => notification.EmployeeActive).length}</NotificationsCount> : ''}
                {GET_STATE.notifications && GET_STATE.isAdmin && GET_STATE.notifications.filter((notification) => notification.adminActive).length > 0 ? <NotificationsCount>{GET_STATE.notifications.filter((notification) => notification.adminActive).length}</NotificationsCount> : ''}
                {GET_STATE.loginData.profileImage ? <img src={GET_STATE.loginData.profileImage} alt="profile image" style={{ width: '30px', borderRadius: '50%' }} /> : <FontAwesomeIcon style={{ width: '11px', color: COLORS.white }} icon={faUser} />}
              </UserWrapper>
            </> :
              <>
                <WrapperLink>
                  <Link href="/">Home</Link>
                </WrapperLink>
                <WrapperLink>
                  <Link href="/about">About</Link>
                </WrapperLink>
                <WrapperLink>
                  <Link href="/signup">Sign up</Link>
                </WrapperLink>
                <Link href="/signin">
                  <WrapperButton>
                    Login
              </WrapperButton>
                </Link>
              </>
            }
          </NavLinks>
        </NavSide>
      </NavDesktop>
      <Overlay active={notificationsOpen} onClick={() => handleOverClick()}></Overlay>
      <NavDesktopNotifications active={notificationsOpen}>
        {GET_STATE.notifications ? GET_STATE.notifications.slice(0).reverse().map((entry) => {
          return (
            <NotificationCard isAdmin={GET_STATE.isAdmin} active={GET_STATE.isAdmin ? entry.adminActive : entry.EmployeeActive}>
              <div className="dot"><FontAwesomeIcon icon={faDotCircle} /></div>
              <div className="text">
                <p className="timestamp">{formatDistanceToNow(new Date(entry.timestamp))} ago</p>
                <p className="content">{GET_STATE.isAdmin ? entry.adminMessage : entry.employeeMessage}</p>
              </div>
            </NotificationCard>
          )
        }) : <p>No notifications yet.</p>}
        {/* // <NotificationCard active={GET_STATE.isAdmin ? notification.adminActive : notification.EmployeeActive}>
          //   <p>{GET_STATE.isAdmin ? notification.adminMessage : notification.employeeMessage}</p>
          // </NotificationCard> */}
      </NavDesktopNotifications>
      <NavMobile open={open}>
        <NavSide>
          <img src={require('./../assets/logo-shifty-orange.svg')} alt="shifty" style={{ width: '55px' }} />
        </NavSide>
        <NavSide>
          <NavLinks>
            <button onClick={() => setOpen(!open)}><FontAwesomeIcon style={{ width: '30px', color: COLORS.orange }} icon={open ? faTimes : faBars} /></button>
          </NavLinks>
        </NavSide>
      </NavMobile>
      <NavMobileMenu open={open}>
        {session ? <>
          <NavWrapperLink>
            <Link href="/">Home</Link>
          </NavWrapperLink>
          <NavWrapperLink>
            <Link href="/about">About</Link>
          </NavWrapperLink>
          <NavWrapperLink>
            <Link href="/profile">Profile</Link>
          </NavWrapperLink>
          <NavWrapperLink>
            <WrapperButton onClick={signOut}>
              Sign out
              </WrapperButton>
          </NavWrapperLink>
        </> :
          <>
            <NavWrapperLink>
              <Link href="/">Home</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <Link href="/about">About</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <Link href="/signup">Sign up</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <Link href="/signin">
                <WrapperButton>
                  Login
              </WrapperButton>
              </Link>
            </NavWrapperLink>
          </>
        }
      </NavMobileMenu>
    </>
  );
};

const NavMobile = styled.div`
  position: fixed;
  width: 100%;
  z-index: 10000;
  display: flex;
  padding: 0 ${SIZES.small};
  background: ${COLORS.lightGray};
  height: 75px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  @media(min-width: ${BP.small}) {
    display: none;
  }
`

const NavDesktop = styled.div`
  position: fixed;
  display: none;
  background: ${COLORS.lightGray};
  color: white;
  z-index: 10000;
  width: 100%;
  height: 75px;
  align-items: center;
  padding: 0 ${SIZES.small};
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  @media(min-width: ${BP.small}) {
    display: flex;
  }
`;

const NavSide = styled.div`
  width: 50%;
  display: flex;
`;

const NavLinks = styled.div`
  display: flex;
  justify-items: flex-end;
  margin-left: auto;

  button {
    background: transparent;
  }
`;

const WrapperLink = styled.li`
  color: ${COLORS.black};
  list-style: none;
  margin: 0 ${SIZES.small};
  display: grid;
  cursor: pointer;
  align-items: center;

  a {
    font-weight: 100;
  }
`;

const WrapperButton = styled.button`
  color: ${COLORS.orange};
  border: 2px solid ${COLORS.orange};
  border-radius: ${BUTTON.borderRadius};
  padding: ${BUTTON.padding};
  font-size: 15px;
  transition: .2s ease;

  &:hover {
    background-color: ${COLORS.orange};
    color: ${COLORS.white};
  }
`;

const NavButton = styled.button`
  border-radius: ${BUTTON.borderRadius};
  padding: ${BUTTON.padding};
  background: none;
`;

const NavImage = styled.div`
  cursor: pointer;
`;

const NavMobileMenu = styled.div`
  z-index: 10;
  padding-top: 70px;
  height: 0px;
  position: absolute;
  background-color: ${COLORS.lightGray};
  width: 100%;
  overflow: hidden;
  transition: .3s ease;

  ${props => props.open && { height: '100%' }}
`;

const NavWrapperLink = styled.div`
  margin: ${SIZES.small};
`;

const UserWrapper = styled.div`
  background-color: ${COLORS.orange};
  height: 30px;
  width: 30px;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 50%;

  img {
    height: 30px;
    object-fit: cover;
    width: 30px;
  }
`;

const NotificationsCount = styled.span`
  position: absolute;
  right: .5rem;
  top: 1rem;
  background-color: ${COLORS.orange};
  box-shadow: 0 3px 3px rgba(0,0,0,0.25), 0 3px 5px rgba(0,0,0,0.1);
  width: 1rem;
  font-size: 11px;
  font-weight: bold;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  text-align: center;
`;

const Overlay = styled.div`
  display: ${({ active }) => active ? 'block' : 'none'};
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
`;

const NavDesktopNotifications = styled.div`
  display: none;

  @media(min-width: ${BP.small}) {
    box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);
    background-color: ${COLORS.white};
    z-index: 1001;
    display: block;
    position: fixed;
    width: 100%;
    max-width: 18rem;
    right: 0;
    top: 75px;
    overflow: ${({ active }) => active ? 'scroll' : 'hidden'};
    transition: .25s ease;
    height: ${({ active }) => active ? '20rem' : '0rem'};
  }
`;

const NotificationCard = styled.div`
  background-color: ${({ active }) => active ? COLORS.orange : COLORS.white};
  opacity: ${({ active }) => active ? '1' : '0.4'};
  padding: .4rem .5rem .6rem;
  border-bottom: 1px solid ${COLORS.darkGray};
  display: flex;
  position: relative;
  color: ${({ active }) => active ? COLORS.white : COLORS.black};

  .dot {
    display: grid;
    align-content: center;
    justify-items: center;
    margin: 0 .6rem 0 0;

    svg {
      color: ${({ active }) => active ? COLORS.white : 'lightgray'};
    }
  }

  .text {
    display: block;
    .timestamp {
      font-size: 8px;
      margin: 0;
      padding: 0;
    }

    .content {
      margin: 0;
      padding: 0;
      font-size: 11px;
      line-height: 14px;
    } 
  }

`;

export default NavBar;