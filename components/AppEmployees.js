import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function AppEmployee() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div>
        <h1>Employees</h1>
      </div>
    </motion.div>
  )
}
