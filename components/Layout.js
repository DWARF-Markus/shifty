import { useSession, getSession } from 'next-auth/client';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import PopUpBanner from './PopUpBanner';

import { useDispatch } from 'react-redux';

const Layout = (props) => {

  const [session, loading] = useSession();

  const dispatch = useDispatch();

  useEffect(async () => {
    if (session && session.hasOwnProperty('user')) {
      const info = await fetch('/api/getcompany', {
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
          }
        })
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Shifty</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      <NavBar />
      <PageWrapper>
        {props.children}
        <PopUpBanner />
      </PageWrapper>
      <Footer />
    </div>
  );
};

const PageWrapper = styled.div`
  min-height: 100%;
  padding: 75px 0 0rem 0;
`;

export default Layout;