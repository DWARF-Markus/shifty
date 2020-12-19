import styled from 'styled-components';
import { COLORS } from '../styles/globals';

const AboutContent = ({ brightMode }) => {
  return (
    <Wrapper brightMode={brightMode}>
      <img src={require(brightMode ? '../assets/logo-shifty-black.svg' : '../assets/logo-shifty-white-fill.svg')} alt="shifty" style={{ width: '350px' }} />
      <p>© 2020</p>
      <p>Developed by Markus Hylleberg</p>
      <div className="divider">
        <h4>Stack</h4>
        <p>This application has been built with Next.js and Prisma.</p>
      </div>
      <div className="divider">
        <h4>Installation</h4>
        <p>Read the README in this git repo <br /> <br /> https://github.com/DWARF-Markus/shifty</p>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  text-align: center;
  background-color: ${({ brightMode }) => brightMode ? COLORS.lightGray : COLORS.black};

  img {
    margin: 10rem 0 1rem;
  }

  p {
    color: ${({ brightMode }) => brightMode ? COLORS.black : COLORS.white};
    padding: 0;
    margin: 0;
  }

  .divider {
    h4 {
      color: ${({ brightMode }) => brightMode ? COLORS.orange : COLORS.white};
    }

    margin: 2rem 0 0;
    padding: 4rem 0;
    border-top: 1px solid ${({ brightMode }) => brightMode ? '#D4D4D4' : 'black'};
  }

`;

export default AboutContent;