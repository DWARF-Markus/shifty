import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/client';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import PopUpBanner from './PopUpBanner';

const Layout = (props) => {

  const [session] = useSession();

  useEffect(() => {
    console.log(session);
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
        { props.children }
        <PopUpBanner />
      </PageWrapper>
      <Footer />
    </div>
  );
};

const PageWrapper = styled.div`
  min-height: 50rem;
  padding-top: 75px;
`;

export default Layout;