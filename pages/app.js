import { useSession, getSession } from 'next-auth/client';
import Router from 'next/router';
import Layout from '../components/Layout';

const App = () => {

  const [session, loading] = useSession()

  if (loading) return null

  if (!loading && !session) {
    Router.push('/signin');
  }

  return (
    <Layout>
      App page
    </Layout>
  );
}

export default App;
