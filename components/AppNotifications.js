import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../styles/globals';
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from 'react-redux';

export default function AppNotifications({ admin, notifications }) {

  const GET_STATE = useSelector((state) => state);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <NotificationsWrapper brightMode={GET_STATE.toggleLightBright}>
        <h3>Notifications</h3>
        {notifications ? notifications.slice(0).reverse().map((notification) => {
          return (
            <Notification brightMode={GET_STATE.toggleLightBright}>
              <p className="timestamp">{formatDistanceToNow(new Date(notification.timestamp))} ago</p>
              <p className="content">{admin ? notification.adminMessage : notification.employeeMessage}</p>
            </Notification>
          );
        }) : <p>No notifications yet.</p>}
      </NotificationsWrapper>
    </motion.div>
  )
}

const NotificationsWrapper = styled.div`
  padding: .5rem 0;
  
    h3 {
      color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
      font-weight: 300;
      line-height: 1.2;
    }
`;

const Notification = styled.div`
  background-color: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
  border: 1px solid ${COLORS.lightGray};
  padding: 1rem;
  height: 5rem;
  display: grid;
  align-content: center;
  margin: .5rem 0 0;

  .timestamp {
    margin: 0;
    padding: 0;
    font-size: 9px;
    color: ${COLORS.darkGray};
  }

  .content {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    margin: 0;
    padding: 0;
  }
`;