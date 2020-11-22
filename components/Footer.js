import styled from 'styled-components';
import { SIZES, COLORS, BP } from '../styles/globals';
import Link from 'next/link';

const Footer = () => {
  return (
    <FooterWrapper>
      <div>
        <h3>Contact</h3>
        <br />
        <p>Refshalevej 155E</p>
        <p>København K</p>
        <p>1432</p>
        <p>Denmark</p>
        <br />
        <p>help@shifty.dk</p>
        <p>+45 12 23 45 56</p>

      </div>
      <div>
        <Link href="/"><img src={require('../assets/logo-shifty-white-fill.svg')} alt="shifty" style={{ width: '75px' }} /></Link>
      </div>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  width: 100%;
  padding: ${SIZES.small};
  height: 25rem;
  display: block;
  background-color: ${COLORS.black};
  color: ${COLORS.white};

  @media (min-width: ${BP.small}) {
    display: flex;
    height: 17rem;
  }

  div {
    text-align: center;
    width: 100%;

    &:first-of-type {
      display: grid;
      align-items: center;
    }

    &:last-of-type {
      margin-top: 5rem;
    }

    @media (min-width: ${BP.small}) {

      height: auto;

      &:first-of-type {
        text-align: left;
        height: auto;
      }
  
      &:last-of-type {
        text-align: right;
        height: auto;
        margin-top: auto;
      }
    }


    p {
      margin: 0;
    }
  }

`;

export default Footer;