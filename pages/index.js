import Layout from '../components/Layout';
import { useQuery } from 'react-query';
import axios from 'axios';

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

  const {data: users} = useQuery('user', fetchUserData);

  return (
    <Layout>
      <h1>Home</h1>
      <h1>{ users && users[0].email }</h1>

      <button onClick={() => createUserRequest()}>Click me to add a new user</button>
    </Layout>
  )
}
