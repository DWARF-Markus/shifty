import { useSession, getSession } from 'next-auth/client';
import Router from 'next/router';
import Layout from '../components/Layout';
import SideBar from '../components/SideBar';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import AppOverview from '../components/AppOverview';
import AppEmployees from '../components/AppEmployees';
import AppTemplates from '../components/AppTemplates';
import AppVacations from '../components/AppVacations';
import AppNotifications from '../components/AppNotifications';
import AppSettings from '../components/AppSettings';
import AppInvite from '../components/AppInvite';
import { BP } from '../styles/globals';
import { motion } from 'framer-motion';

const App = () => {

  const [session, loading] = useSession();
  const GET_STATE = useSelector((state) => state);

  if (loading) return null

  if (!loading && !session) {
    Router.push('/signin');
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <SideBar state={GET_STATE} />
        <AppContent sidebarOpen={GET_STATE.sideBarToggle}>
          {GET_STATE.activeAppPage === 'Overview' ? <AppOverview state={GET_STATE} /> : ''}
          {GET_STATE.activeAppPage === 'Employees' ? <AppEmployees /> : ''}
          {GET_STATE.activeAppPage === 'Templates' ? <AppTemplates /> : ''}
          {GET_STATE.activeAppPage === 'Vacations' ? <AppVacations /> : ''}
          {GET_STATE.activeAppPage === 'Notifications' ? <AppNotifications admin={GET_STATE.isAdmin} notifications={GET_STATE.loginData.CompanyEmployeeNotifications} /> : ''}
          {GET_STATE.activeAppPage === 'Settings' ? <AppSettings /> : ''}
          {GET_STATE.activeAppPage === 'Invite' ? <AppInvite /> : ''}
        </AppContent>
      </Layout>
    </motion.div>
  );
}

const AppContent = styled.div`
  padding: 0 .5rem;
  transition: .3s ease;

  @media (min-width: ${BP.small}) {
    padding-left: ${({ sidebarOpen }) => sidebarOpen ? '13rem' : '5rem'};
    padding-right: 1rem;
  }
`;


// export async function getStaticProps() {
//   const res = await fetch(`https://shifty-seven.vercel.app/api/getcompanyusers?company=1`);
//   const employees = await res.json();
//   return {
//     props: {
//       employees,
//     },
//   }
// }


export default App;
