import React from 'react';
import { Container, Logo, Toolbar } from './style';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';

/**
 * 레이아웃 헤더
 */
function Header({ scrollTop }: { scrollTop: boolean }) {
  // 임시 데이터
  const isLogin = false;

  return (
    <Container scrollTop={scrollTop}>
      <Logo src={`${process.env.PUBLIC_URL}assets/logoicon.svg`} alt="logo" />
      <Toolbar>
        <FaSearch size="21" />
        {isLogin && <FaUser size="21" />}
        {!isLogin && <IoLogIn size="31" />}
      </Toolbar>
    </Container>
  );
}

export default Header;
