import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function AppInvite() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div>
        <h1>Invite</h1>
      </div>
    </motion.div>
  )
}
