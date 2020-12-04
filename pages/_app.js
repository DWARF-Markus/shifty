import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { useStore } from '../store';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { AnimatePresence } from 'framer-motion';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <NextAuthProvider session={pageProps.session}>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <NavBar />
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} />
          </AnimatePresence>
          <Footer />
        </DndProvider>
      </Provider>
    </NextAuthProvider>
  )
}

export default MyApp
