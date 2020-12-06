import Layout from '../components/Layout';
import HomeHero from '../components/HomeHero';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';

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

  const { data: users } = useQuery('user', fetchUserData);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <HomeHero />
      </Layout>
    </motion.div>
  )
}
