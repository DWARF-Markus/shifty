import { useSession } from 'next-auth/client';
import Layout from '../components/Layout';

const App = () => {

  const [session] = useSession();

  return (
    <Layout>
      App page
    </Layout>
  );
}

export default App;
