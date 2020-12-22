import styled from 'styled-components';
import Link from 'next/link';
import { COLORS } from '../styles/globals';

const HomeCallToAction = ({ brightMode }) => {
  return (
    <Wrapper brightMode={brightMode}>
      <h4>Sign up for a free trial today!</h4>
      <Link href="/signup">
        <button className="btn--primary">Sign up</button>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`

  background: ${({ brightMode }) => brightMode ? '#ececec' : COLORS.black};
  color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};

  h4 {
    font-size: 20px;
    font-weight: 100;
  }
  
  text-align: center;
  padding: 1rem 1rem 5rem 1rem;
`;

export default HomeCallToAction;