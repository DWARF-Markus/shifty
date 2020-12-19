import styled from 'styled-components';
import { SIZES, COLORS, BP } from '../styles/globals';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

const Footer = () => {

  const router = useRouter();
  const GET_STATE = useSelector((state) => state);

  return (
    <FooterWrapper onAppPage={router.pathname.includes('/app')} sidebarOpen={GET_STATE.sideBarToggle}>
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
  border-top: 1px solid #3c3c3c;
  height: 25rem;
  display: block;
  background-color: ${COLORS.black};
  color: ${COLORS.white};
  transition: .15s ease;

  ${props => props.onAppPage && `
     padding-left: ${props.sidebarOpen ? '13rem' : '5rem'}; 
 `};

  ${props => !props.onAppPage && `
      padding-left: none!important;
  `};

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
      padding-left:
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