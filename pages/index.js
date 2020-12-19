import Layout from '../components/Layout';
import HomeHero from '../components/HomeHero';
import HomeConceptDescription from '../components/HomeConceptDescription';
import HomeCallToAction from '../components/HomeCallToAction';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';

async function createUserRequest() {
  const obj = {
    user: {
      name: "Finally",
      email: "it@works.dk",
      password: "secret13123"
    }
  }

  await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': "application/json"
    },
    body: JSON.stringify(obj)
  })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    });
}


async function fetchUserData() {
  const res = await fetch('/api/user');
  const data = await res.json();
  const { users } = data;
  return users;
}


export default function HomePage() {

  const GET_TOGGLE = useSelector((state) => state.toggleLightBright);

  const { data: users } = useQuery('user', fetchUserData);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <HomeHero brightMode={GET_TOGGLE} />
        <HomeConceptDescription brightMode={GET_TOGGLE} />
        <HomeCallToAction brightMode={GET_TOGGLE} />
      </Layout>
    </motion.div>
  )
}
