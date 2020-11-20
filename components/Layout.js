import Head from 'next/head';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = (props) => {
  return (
    <div>
      <Head>
        <title>Shifty</title>
      </Head>
      <NavBar />
      { props.children }
      <Footer />
    </div>
  );
};

export default Layout;