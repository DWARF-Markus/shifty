import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import AboutContent from '../components/AboutContent';

export default function AboutPage() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <AboutContent />
      </Layout>
    </motion.div>
  )
}
