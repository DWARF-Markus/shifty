import { useState, useEffect } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { setLoading } from '../store/actions/appActions';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const Layout = (props) => {

  const dispatch = useDispatch();
  const [loading, newLoadingState] = useState(useSelector(state => state.loading));

  const handleNewLoadingState = () => {
    dispatch(setLoading(!loading));
    newLoadingState(!loading);
  }

  return (
    <div>
      <Head>
        <title>Shifty</title>
        <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Quicksand" />
      </Head>
      <NavBar />
      <PageWrapper>
        { loading ? 'true' : 'false' }
        <button onClick={() => handleNewLoadingState()}>Click me to change loading state</button>
        { props.children }
      </PageWrapper>
      <Footer />
    </div>
  );
};

const PageWrapper = styled.div`
  padding: 1rem;
  min-height: 30rem;
`;

export default Layout;