import '../styles/globals.css';
import { Provider } from 'react-redux';
import { Provider as NextAuthProvider } from 'next-auth/client';
import store from '../store/index';

function MyApp({ Component, pageProps }) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </NextAuthProvider>
  )
}

export default MyApp
