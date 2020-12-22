import styled from 'styled-components';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { COLORS, SIZES, BP, BUTTON } from '../styles/globals';

const HomeHero = ({ brightMode }) => {

  const variants = {
    calendarSlide: () => ({
      transform: 'translateX(-15%)',
      opacity: 1,
      transition: {
        type: "spring",
        restDelta: 2
      }
    }),
    shiftOneSlide: () => ({
      transform: 'translateX(-5%)',
      opacity: 1,
      transition: {
        duration: 2,
        type: "spring",
        restDelta: 2
      }
    }),
    shiftTwoSlide: () => ({
      transform: 'translateX(-43%)',
      opacity: 1,
      transition: {
        duration: 3,
        type: "spring",
        restDelta: 2
      }
    }),
    employeeOneSlide: () => ({
      transform: 'translateX(-23%)',
      opacity: 1,
      transition: {
        duration: 4,
        type: "spring",
        restDelta: 5
      }
    }),
    employeeTwoSlide: () => ({
      transform: 'translateX(-63%)',
      opacity: 1,
      transition: {
        duration: 4.4,
        type: "spring",
        restDelta: 2
      }
    })
  }




  return (
    <HomeHeroWrapper brightMode={brightMode} image={require('../assets/logo-shifty-orange.svg')}>
      <HeroText brightMode={brightMode}>
        <div>
          <h1>Let's get you sorted</h1>
          <p>Sign up to Shifty and take full control over your workspace!</p>
          <Link href="/signup">
            <HeroButton>Sign up</HeroButton>
          </Link>
        </div>
      </HeroText>
      <HeroAnimationPackage>
        <motion.div
          animate="calendarSlide"
          variants={variants}
          style={{ width: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}
        >
          <img className="calendar" src={require(brightMode ? '../assets/hero-calendar.png' : '../assets/hero-calendar-dark.png')} alt="calendar" />
        </motion.div>
        <motion.div
          animate="shiftOneSlide"
          variants={variants}
          style={{ width: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}
        >
          <img className="shift shift-one" src={require(brightMode ? '../assets/hero-shift1.png' : '../assets/hero-shift1-dark.png')} alt="shift" />
        </motion.div>
        <motion.div
          animate="shiftTwoSlide"
          variants={variants}
          style={{ width: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}
        >
          <img className="shift shift-two" src={require(brightMode ? '../assets/hero-shift2.png' : '../assets/hero-shift2-dark.png')} alt="shift" />
        </motion.div>
        <motion.div
          animate="employeeOneSlide"
          variants={variants}
          style={{ width: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}
        >
          <img className="employee employee-one" src={require(brightMode ? '../assets/hero-employee1.png' : '../assets/hero-employee1-dark.png')} alt="employee" />
        </motion.div>
        <motion.div
          animate="employeeTwoSlide"
          variants={variants}
          style={{ width: '100%', display: 'grid', alignItems: 'center', justifyItems: 'center' }}
        >
          <img className="employee employee-two" src={require(brightMode ? '../assets/hero-employee2.png' : '../assets/hero-employee2-dark.png')} alt="employee" />
        </motion.div>
      </HeroAnimationPackage>
    </HomeHeroWrapper>
  );
}

const HomeHeroWrapper = styled.div`
  height: 43rem;
  background: ${({ brightMode }) => brightMode ? COLORS.lightGray : COLORS.black};

  @media (min-width: ${BP.small}) {
    height: 30rem;
  }
`;

const HeroText = styled.div`
  position: absolute;
  z-index: 3;
  top: 10rem;
  height: 43rem;
  display: grid;
  align-items: center;
  padding: 0 5rem;

  div {
    h1 {
      line-height: 38px;
    }
    h1, p {
      color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    }
  }

  @media (min-width: ${BP.small}) {
    height: 30rem;
    top: 0;
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

const HeroAnimationPackage = styled.div`
  position: absolute;
  right: 0;

  img {
    object-fit: cover;

    @media (min-width: ${BP.small}) {
      opacity: 1;
    }
  }

  .calendar {
    width: calc(40rem * 0.55);
    margin-top: 6rem;
    box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1); 

    @media (min-width: ${BP.small}) {
      width: 40rem;
    }
  }

  .shift {
    width: calc(12rem * 0.55);
    position: absolute;
    margin-top: -8rem;

    @media (min-width: ${BP.small}) {
      width: 12rem;
      margin-top: -12rem;
    }
  }

  .shift-two {
    width: calc(8rem * 0.55);
    margin-top: -7rem;

    @media (min-width: ${BP.small}) {
      width: 8rem;
      margin-top: -19rem;
    }
  }

  .employee-one {
    width: calc(9rem * 0.55);
    margin-top: -20rem;
    animation-name: floating; 
    animation-duration: 3s; 
    animation-iteration-count: infinite; 
    animation-timing-function: ease-in-out; 

    @media (min-width: ${BP.small}) {
      width: 9rem;
      margin-top: -35rem;
    }
  }

  .employee-two {
    width: calc(11rem * 0.55);
    margin-top: 1rem;
    animation-name: floating2; 
    animation-duration: 2.3s; 
    animation-iteration-count: infinite; 
    animation-timing-function: ease-in-out; 

    @media (min-width: ${BP.small}) {
      width: 11rem;
    }
  }

  @keyframes floating { 
    0% { transform: translate(0,  0px); } 
    50%  { transform: translate(0, 5px); } 
    100%   { transform: translate(0, -0px); }     
  } 

  @keyframes floating2 { 
    0% { transform: translate(0,  0px); } 
    50%  { transform: translate(0, 7px); } 
    100%   { transform: translate(0, -0px); }     
  } 

`;

export default HomeHero;