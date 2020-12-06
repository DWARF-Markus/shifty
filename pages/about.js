import Layout from '../components/Layout';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <h1>About</h1>
      </Layout>
    </motion.div>
  )
}
