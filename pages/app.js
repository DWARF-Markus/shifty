import { useSession, getSession } from 'next-auth/client';
import Router from 'next/router';
import Layout from '../components/Layout';
import SideBar from '../components/SideBar';
import Calendar from '../components/Calendar';
import { useSelector } from 'react-redux';

const App = () => {

  const [session, loading] = useSession();
  const GET_STATE = useSelector((state) => state);

  if (loading) return null

  if (!loading && !session) {
    Router.push('/signin');
  }

  return (
    <Layout>
      <SideBar state={GET_STATE} />
      <Calendar />
    </Layout>
  );
}

export default App;
