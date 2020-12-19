import styled from 'styled-components';
import Link from 'next/link';

const HomeCallToAction = () => {
  return (
    <Wrapper>
      <h4>Sign up for a free trial today!</h4>
      <Link href="/signup">
        <button className="btn--primary">Sign up</button>
      </Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`

  h4 {
    font-size: 20px;
    font-weight: 100;
  }

  padding: 1rem;
  text-align: center;
  margin: 0 0 5rem 0;
`;

export default HomeCallToAction;