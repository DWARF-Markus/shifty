import Layout from '../components/Layout';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function LoginPage() {

  const [session] = useSession();

  return (
    <Layout>
      { !session ? <button onClick={signIn}>Sign in</button> : 
       <>
        { session.user.image && <img src={session.user.image} style={{width: '25px', borderRadius: '50%'}} /> }
        { session.user.name && <h1>Hello {session.user.name}!</h1> }
        <button onClick={signOut}>Sign out</button>
     </> }
    </Layout>
  )
}
