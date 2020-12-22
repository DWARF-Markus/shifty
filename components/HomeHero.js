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
  height: 23rem;
  background: ${({ brightMode }) => brightMode ? COLORS.lightGray : COLORS.black};

  @media (min-width: ${BP.small}) {
    height: 30rem;
  }
`;

const HeroText = styled.div`
  position: absolute;
  z-index: 3;
  height: 23rem;
  display: grid;
  align-items: center;
  padding: 0 5rem;

  div {
    h1, p {
      color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    }
  }

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

const HeroAnimationPackage = styled.div`
  position: absolute;
  right: 0;

  img {
    object-fit: cover;
  }

  .calendar {
    width: 40rem;
    margin-top: 6rem;
    box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1); 
  }

  .shift {
    width: 12rem;
    position: absolute;
    margin-top: -12rem;
  }

  .shift-two {
    width: 8rem;
    margin-top: -19rem;
  }

  .employee-one {
    width: 9rem;
    margin-top: -35rem;
    animation-name: floating; 
    animation-duration: 3s; 
    animation-iteration-count: infinite; 
    animation-timing-function: ease-in-out; 
  }

  .employee-two {
    width: 11rem;
    margin-top: 1rem;
    animation-name: floating2; 
    animation-duration: 2.3s; 
    animation-iteration-count: infinite; 
    animation-timing-function: ease-in-out; 
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