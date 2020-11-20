import { useState } from 'react';
import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { setLoading } from '../store/actions/appActions';
import { useSelector, useDispatch } from 'react-redux'

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
      </Head>
      <NavBar />
      { loading ? 'true' : 'false' }
      <button onClick={() => handleNewLoadingState()}>Click me to change loading state</button>
      { props.children }
      <Footer />
    </div>
  );
};

export default Layout;