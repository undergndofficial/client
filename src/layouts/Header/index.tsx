import React from 'react';
import { Container, Logo, Toolbar } from './style';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import SearchPopup from './SearchPopup';

interface HeaderPropsType {
  scrollTop: boolean;
  showSearchPopup: boolean;
  setShowSearchPopup: React.Dispatch<React.SetStateAction<boolean>>;
}
/**
 * 레이아웃 헤더
 */
function Header({
  scrollTop,
  showSearchPopup,
  setShowSearchPopup,
}: HeaderPropsType) {
  // 임시 데이터
  const isLogin = false;

  return (
    <Container scrollTop={scrollTop}>
      <Logo src={`${process.env.PUBLIC_URL}assets/logoicon.svg`} alt="logo" />
      <Toolbar>
        <FaSearch
          size="21"
          onClick={(e) => {
            e.stopPropagation();
            setShowSearchPopup(true);
          }}
          style={{ zIndex: 999 }}
        />
        {isLogin && <FaUser size="21" />}
        {!isLogin && <IoLogIn size="31" />}
      </Toolbar>
      {showSearchPopup && <SearchPopup />}
    </Container>
  );
}

export default Header;
