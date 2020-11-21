import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { COLORS, SIZES, BUTTON, BP } from '../styles/globals';
import { faTimes, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, signOut, useSession } from 'next-auth/client';

const NavBar = () => {

  const [session] = useSession();

  const [open, setOpen] = useState(false);

  return (
    <>
    <NavDesktop>
      <NavSide>
        <NavImage>
          <Link href="/"><img src={require('../assets/logo-shifty-orange.svg')} alt="shifty" style={{ width: '75px' }} /></Link>
        </NavImage>
      </NavSide>
      <NavSide>
        <NavLinks>
          { session ? <>
            <WrapperLink>
              <Link href="/">Home</Link>
            </WrapperLink>
            <WrapperLink>
              <Link href="/about">About</Link>
            </WrapperLink>
            <WrapperLink>
              <Link href="/profile">Profile</Link>
            </WrapperLink>
            <UserWrapper>
              <FontAwesomeIcon onClick={signOut} style={{ width: '11px', color: COLORS.white }} icon={faUser} />
            </UserWrapper>
          </> : 
          <>
            <WrapperLink>
              <Link href="/">Home</Link>
            </WrapperLink>
            <WrapperLink>
              <Link href="/about">About</Link>
            </WrapperLink>
            <WrapperLink>
              <Link href="/signup">Sign up</Link>
            </WrapperLink>
            <WrapperButton onClick={signIn}>
              Login
            </WrapperButton>
          </>
          }
        </NavLinks>
      </NavSide>
    </NavDesktop>
    <NavMobile open={open}>
      <NavSide>
        <img src={require('../assets/logo-shifty-orange.svg')} alt="shifty" style={{ width: '55px' }} />
      </NavSide>
      <NavSide>
        <NavLinks>
          <button onClick={() => setOpen(!open)}><FontAwesomeIcon style={{ width: '30px', color: COLORS.orange }} icon={open ? faTimes : faBars} /></button> 
        </NavLinks>
      </NavSide>
    </NavMobile>
    <NavMobileMenu open={open}>
    { session ? <>
            <NavWrapperLink>
              <Link href="/">Home</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <Link href="/about">About</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <Link href="/profile">Profile</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <WrapperButton onClick={signOut}>
                Sign out
              </WrapperButton>
            </NavWrapperLink>
          </> : 
          <>
            <NavWrapperLink>
              <Link href="/">Home</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <Link href="/about">About</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <Link href="/signup">Sign up</Link>
            </NavWrapperLink>
            <NavWrapperLink>
              <WrapperButton onClick={signIn}>
                Login
              </WrapperButton>
            </NavWrapperLink>
          </>
          }
    </NavMobileMenu>
    </>
  );
};

const NavMobile = styled.div`
  position: fixed;
  width: 100%;
  z-index: 10000;
  display: flex;
  padding: 0 ${SIZES.small};
  background: ${COLORS.lightGray};
  height: 70px;
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  @media(min-width: ${BP.small}) {
    display: none;
  }
`

const NavDesktop = styled.div`
  position: fixed;
  display: none;
  background: ${COLORS.lightGray};
  color: white;
  z-index: 10000;
  width: 100%;
  height: 75px;
  align-items: center;
  padding: 0 ${SIZES.small};
  box-shadow: 0 3px 3px rgba(0,0,0,0.05), 0 3px 5px rgba(0,0,0,0.1);

  @media(min-width: ${BP.small}) {
    display: flex;
  }
`;

const NavSide = styled.div`
  width: 50%;
  display: flex;
`;

const NavLinks = styled.div`
  display: flex;
  justify-items: flex-end;
  margin-left: auto;
`;

const WrapperLink = styled.li`
  color: ${COLORS.black};
  list-style: none;
  margin: 0 ${SIZES.small};
  display: grid;
  cursor: pointer;
  align-items: center;
`;

const WrapperButton = styled.button`
  background: ${COLORS.orange};
  color: ${COLORS.white};
  border-radius: ${BUTTON.borderRadius};
  padding: ${BUTTON.padding};
  font-size: 15px;
`;

const NavButton = styled.button`
  border-radius: ${BUTTON.borderRadius};
  padding: ${BUTTON.padding};
  background: none;
`;

const NavImage = styled.div`
  cursor: pointer;
`;

const NavMobileMenu = styled.div`
  z-index: 10;
  padding-top: 70px;
  height: 0px;
  position: absolute;
  background-color: ${COLORS.lightGray};
  width: 100%;
  overflow: hidden;
  transition: .3s ease;

  ${props => props.open && { height: '100%' }}
`;

const NavWrapperLink = styled.div`
  margin: ${SIZES.small};
`;

const UserWrapper = styled.div`
  background-color: ${COLORS.orange};
  height: 30px;
  width: 30px;
  display: grid;
  align-items: center;
  justify-items: center;
  border-radius: 50%;
`;


export default NavBar;