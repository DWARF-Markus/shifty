import styled from 'styled-components';
import { motion } from 'framer-motion';
import { COLORS } from '../styles/globals';
import { formatDistanceToNow } from 'date-fns';

export default function AppNotifications({ admin, notifications }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <NotificationsWrapper>
        <h3>Notifications</h3>
        {notifications ? notifications.slice(0).reverse().map((notification) => {
          return (
            <Notification>
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
    h3 {
      font-weight: 300;
      line-height: 1.2;
    }
`;

const Notification = styled.div`
  background-color: ${COLORS.white};
  border: 1px solid ${COLORS.lightGray};
  padding: 1rem;
  height: 5rem;
  display: grid;
  align-content: center;
  margin: .3rem;

  .timestamp {
    margin: 0;
    padding: 0;
    font-size: 9px;
    color: ${COLORS.darkGray};
  }

  .content {
    margin: 0;
    padding: 0;
  }
`;