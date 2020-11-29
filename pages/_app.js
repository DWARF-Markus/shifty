import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { useStore } from '../store';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <NextAuthProvider session={pageProps.session}>
      <Provider store={store}>
        <NavBar />
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
        <Footer />
      </Provider>
    </NextAuthProvider>
  )
}

export default MyApp
