import '../styles/globals.scss';
import { Provider } from 'react-redux';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { useStore } from '../store';

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <NextAuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NextAuthProvider>
  )
}

export default MyApp
