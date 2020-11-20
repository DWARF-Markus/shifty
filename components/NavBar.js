import { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const NavBar = () => {

  const [open, setOpen] = useState(false);

  return (
    <Wrapper open={open}>
      <WrapperLink open={open}>
        <Link href="/">Home</Link>
      </WrapperLink>
      <WrapperLink open={open}>
        <Link href="/about">About</Link>
      </WrapperLink>
      <WrapperLink open={open}>
        <Link href="/login">Login</Link>
      </WrapperLink>
      <button onClick={() => setOpen(!open)}>Open menu</button> 
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background: orange;
  color: white;

  ${props => props.open && {
    background: 'blue',
    color: 'gray'
  }}
`;

const WrapperLink = styled.li`
  background: red;
  color: yellow;

  ${props => props.open && {
    background: 'green',
    color: 'yellow'
  }}
`;


export default NavBar;