import styled from 'styled-components';
import { COLORS } from '../styles/globals';

const AboutContent = () => {
  return (
    <Wrapper>
      <img src={require('../assets/logo-shifty-black.svg')} alt="shifty" style={{ width: '350px' }} />
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

  img {
    margin: 10rem 0 1rem;
  }

  .divider {
    h4 {
      color: ${COLORS.orange};
    }

    margin: 4rem 0;
    padding-top: 4rem;
    border-top: 1px solid #D1D1D1;
  }

`;

export default AboutContent;