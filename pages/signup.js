import { useState } from 'react';
import Layout from '../components/Layout';

export default function LoginPage() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    await fetch('/api/newuser', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          firstName,
          lastName,
          email,
          password
        }
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  }

  return (
    <Layout>
      <h1>Sign up!</h1>
      <input type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
      <input type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="text" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleSignup()}>Sign up</button>
    </Layout>
  )
}
