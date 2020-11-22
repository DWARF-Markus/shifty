import styled from 'styled-components';
import Link from 'next/link';
import { COLORS, SIZES, BP, BUTTON } from '../styles/globals';

const HomeHero = () => {
  return (
    <HomeHeroWrapper image={require('../assets/logo-shifty-orange.svg')}>
      <HeroText>
        <div>
          <h1>Let's get you sorted</h1>
          <p>Sign up to Shifty and take full control over your workspace!</p>
            <Link href="/signup">
              <HeroButton>Sign up</HeroButton>
            </Link>
        </div>
      </HeroText>
      <img src={require('../assets/bar-image-two.jpg')} alt="shifty" style={{ width: '100%' }} />
    </HomeHeroWrapper>
  );
}

const HomeHeroWrapper = styled.div`
  height: 23rem;
  background: rgb(152 99 48);

  @media (min-width: ${BP.small}) {
    height: 30rem;
  }

  img {
    height: 100%;
    width: 100%;
    opacity: .15;
    object-fit: cover;
  }
`;

const HeroText = styled.div`
  position: absolute;
  z-index: 3;
  color: ${COLORS.white};
  height: 23rem;
  display: grid;
  align-items: center;
  padding: 0 ${SIZES.small};

  @media (min-width: ${BP.small}) {
    height: 30rem;
  }
`;

const HeroButton = styled.button`
  background: ${COLORS.orange};
  color: ${COLORS.white};
  border-radius: ${BUTTON.borderRadius};
  padding: ${BUTTON.padding};
  font-size: 15px;
  transition: .2s ease;

  &:hover {
    background: ${COLORS.white};
    color: ${COLORS.orange};
  }
`;

export default HomeHero;