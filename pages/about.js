import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import AboutContent from '../components/AboutContent';
import { useSelector } from 'react-redux';

export default function AboutPage() {

  const GET_TOGGLE = useSelector((state) => state.toggleLightBright);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Layout>
        <AboutContent brightMode={GET_TOGGLE} />
      </Layout>
    </motion.div>
  )
}
