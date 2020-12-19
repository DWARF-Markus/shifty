import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import styled from 'styled-components';
import PopUpBanner from './PopUpBanner';
import { COLORS } from '../styles/globals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb } from '@fortawesome/free-solid-svg-icons';

import { useDispatch } from 'react-redux';

const Layout = (props) => {

  const [brightMode, setBrightMode] = useState(true);
  const [session, loading] = useSession();

  const dispatch = useDispatch();

  useEffect(async () => {
    if (session && session.hasOwnProperty('user')) {
      const info = await fetch('/api/getcompanyoruser', {
        method: 'POST',
        headers: {
          'Content-Type': "application/json"
        },
        body: JSON.stringify({
          company: {
            email: session.user.email,
          }
        })
      }).then(res => res.json())
        .then(data => {
          if (data.company) {
            dispatch({
              type: 'SET_LOGIN_DATA',
              payload: data
            })

            const countNotifications = data.isAdmin ? data.company.CompanyEmployeeNotifications : data.company.CompanyEmployeeNotifications;

            dispatch({
              type: 'SET_NOTIFICATIONS',
              payload: countNotifications
            })
          }



        });


    }
  }, []);

  const handleToggleClick = () => {
    setBrightMode(!brightMode);
    dispatch({
      type: 'SET_LIGHT_TOGGLE',
    })
  }

  return (
    <div>
      <Head>
        <title>Shifty</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <PageWrapper>
        <LightToggle brightTheme={brightMode} onClick={() => handleToggleClick()}><FontAwesomeIcon style={{ width: '10px' }} icon={faLightbulb} /></LightToggle>
        {props.children}
        <PopUpBanner />
      </PageWrapper>
    </div>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 75px 0 0rem 0;
`;

const LightToggle = styled.div`
  cursor: pointer;
  position: fixed;
  bottom: 4.7rem;
  display: grid;
  align-content: center;
  justify-items: center;
  z-index: 10000;
  background-color: ${({ brightTheme }) => brightTheme ? COLORS.orange : COLORS.black};
  height: 2rem;
  right: 1.5rem;
  width: 2rem;
  border-radius: 50%;
  animation: slidein 1.2s ease;
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  svg {
      color: ${COLORS.white};
    }

  :hover {
    background-color: ${COLORS.white};

    svg {
      color: ${COLORS.orange};
    }
  }

  @keyframes slidein {
    0% {
      transform: translate(10rem, 0);
    }
    66% {
      transform: translate(10rem, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
`;

export default Layout;