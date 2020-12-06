import { useState, useEffect } from 'react';
import { csrfToken, providers, signIn } from 'next-auth/client';
import Layout from '../components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import InputField from '../components/InputField';
import styled from 'styled-components';
import { BP, COLORS } from '../styles/globals';
import Link from 'next/link';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

export default function SignIn({ csrfToken, providers }) {

  const router = useRouter();
  const { pid } = router.query;
  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);

  const GET_STATE = useSelector((state) => state);

  const handleLoading = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
    }, 2000);
  }

  useEffect(() => {
    if (router.query.error === 'CredentialsSignin') {
      dispatch({
        type: 'SET_POP_UP_ERROR',
        payload: 'Wrong email or password'
      });
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn('credentials', { email: GET_STATE.email, password: GET_STATE.signUpPassword });
    router.push('/app');
  }


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        {submitting ? <SignUpSpinner><FontAwesomeIcon icon={faSpinner} /></SignUpSpinner> : ''}
        <SignInWrapper loading={submitting}>
          <img src={require('../assets/logo-shifty-orange.svg')} />
          <form method='post' onSubmit={(e) => handleSubmit(e)}>
            <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
            <InputField name="email" type="email" label="Email" setter={'SET_EMAIL'} getter={'email'} />
            <InputField name="password" type="password" label="Password" setter={'SIGN_UP_PASSWORD'} getter={'signUpPassword'} />
            <button className="btn--primary" onClick={() => handleLoading()}>Sign in</button>
          </form>

          <GoogleLogin>
            <div onClick={() => signIn(providers.google.id)} key={providers.google.name}>
              <img src={require('../assets/google.svg')} />
              <button>Sign in with {providers.google.name}</button>
            </div>
          </GoogleLogin>
        </SignInWrapper>
        <SignUpDisclaimer>
          <Link href="/signup"><p>Not signed up? Sign up here!</p></Link>
        </SignUpDisclaimer>
      </Layout>
    </motion.div>
  )
}

const SignInWrapper = styled.div`
  transition: .2s ease;
  opacity: ${({ loading }) => loading ? 0.25 : 1};
  max-width: 600px;
  width: calc(100% - 1rem);
  padding: 2rem .5rem;
  margin: 5rem auto 1rem;
  background: white;
  text-align: center;
  border-radius: 5px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  @media (min-width: ${BP.small}) {
    padding: 2rem 2rem 1rem;
  }

  img {
    width: 120px;
  }
`;

const GoogleLogin = styled.div`
  width: 100%;
  text-align: center;
  margin: 1rem 0;

  div {
    align-content: center;
    display: flex;
    margin: 0 auto;
    justify-content: center;
    border-top: 1px solid ${COLORS.lightGray};
    padding: .5rem 0 0;
    cursor: pointer;
    img {
      width: 25px;
    }

    button {
      background: white;
      color: gray;
    }
  }
`;

const SignUpDisclaimer = styled.div`
  text-align: center;
  color: ${COLORS.orange};
  cursor: pointer;
`;

const SignUpSpinner = styled.div`
  position: absolute;
  color: ${COLORS.orange};
  width: 100%;
  height: 73%;
  display: grid;
  align-items: center;
  justify-content: center;

  @keyframes spin {
    from {transform: rotate(0deg)}
    to {transform: rotate(360deg)}
  }

  svg {
    width: 25px;
    animation: spin 1s infinite linear;
  }
`;

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
    providers: await providers(context)
  }
}