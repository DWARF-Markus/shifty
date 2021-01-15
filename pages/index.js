import Layout from '../components/Layout';
import HomeHero from '../components/HomeHero';
import HomeConceptDescription from '../components/HomeConceptDescription';
import HomeCallToAction from '../components/HomeCallToAction';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';


export default function HomePage() {

  const GET_TOGGLE = useSelector((state) => state.toggleLightBright);

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
