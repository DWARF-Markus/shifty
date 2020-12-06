import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import SignUpForm from '../components/SignUpForm';
import { motion } from 'framer-motion';

const SignUpPage = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <SignUpForm />
      </Layout>
    </motion.div>
  )
}

export default SignUpPage;
