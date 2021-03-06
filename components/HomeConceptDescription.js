import styled from 'styled-components';
import { BP, COLORS } from '../styles/globals';

const HomeConceptDescription = ({ brightMode }) => {
  return (
    <Wrapper brightMode={brightMode}>
      <h3>Why Shifty?</h3>
      <p className="subheadline">Shifty allows you to get full control over your workplace - and make it joyful for your employees to get an overview over their shifts! Shifty will be your platform to handle your employees, their shifts, their vacations, and much more!</p>
      <div className="content">
        <ConceptCard brightMode={brightMode}>
          <img src={require('../assets/home-image.png')} alt="shifty" style={{ width: '100%' }} />
          <h4>Get an overview</h4>
          <p>Shifty allows you to view all your shifts and its employees in a minimalistic and elegant weekly calendar view.</p>
        </ConceptCard>
        <ConceptCard brightMode={brightMode}>
          <img src={require('../assets/home-image-2.png')} alt="shifty" style={{ width: '100%' }} />
          <h4>Help your employees</h4>
          <p>By using Shifty you'll improve the communication of your workspace so employees always will be notified regarding shifts, vacations and much more.</p>
        </ConceptCard>
        <ConceptCard brightMode={brightMode}>
          <img src={require('../assets/home-image-3.png')} alt="shifty" style={{ width: '100%' }} />
          <h4>Easy to use</h4>
          <p>Shifty is build to be as easy as possible to use for managing shifts. Our goal is making shift management the easiest part of a day.</p>
        </ConceptCard>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 1rem 1rem 5rem 1rem;
  background: ${({ brightMode }) => brightMode ? '#ececec' : COLORS.black};

  h3 {
    margin: 4rem 0 0;
    font-weight: 100;
    color: ${({ brightMode }) => brightMode ? COLORS.orange : COLORS.white};
    text-align: center;
  }

  .subheadline {
    margin: 2rem 10rem 7rem;
    font-size: 18px;
    line-height: 30px;
    text-align: center;
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
  }

  .content {
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;

    @media (min-width: ${BP.small}) {
      grid-template-columns: 1fr 1fr 1fr;
    }

  }
`;

const ConceptCard = styled.div`
  text-align: center;
  border-radius: 10px;
  border: 1px solid ${({ brightMode }) => brightMode ? '#E3E3E3' : 'black'};
  background-color: ${({ brightMode }) => brightMode ? COLORS.white : COLORS.black};
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  img {
    height: 18rem;
    width: 100%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    object-fit: cover;
    opacity: .8;
    border-bottom: 1px solid ${COLORS.darkGray};
  }

  h4 {
      color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
      font-weight: 400;
      font-size: 25px;
    }

  p {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    padding: 1rem;
  }
`;

export default HomeConceptDescription;