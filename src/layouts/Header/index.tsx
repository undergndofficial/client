import React from 'react';
import { Container, Logo, Toolbar } from './style';
import { FaSearch, FaUser } from 'react-icons/fa';

/**
 * 레이아웃 헤더
 */
function Header({ scrollTop }: { scrollTop: boolean }) {
  return (
    <Container scrollTop={scrollTop}>
      <Logo src={`${process.env.PUBLIC_URL}assets/logoicon.svg`} alt="logo" />
      <Toolbar>
        <FaSearch size="21" />
        <FaUser size="21" />
      </Toolbar>
    </Container>
  );
}

export default Header;
