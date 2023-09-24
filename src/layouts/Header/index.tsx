import React, { useState, useCallback } from 'react';
import { Container, Logo, Toolbar } from './style';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import SearchPopup from 'components/SearchPopup';
import { useNavigate } from 'react-router-dom';
import Modal from 'layouts/Modal';
import LoginPopup from 'components/LoginPopup';

interface HeaderPropsType {
  scrollTop: boolean;
}
/**
 * 레이아웃 헤더
 */
function Header({ scrollTop }: HeaderPropsType) {
  // 임시 데이터
  const isLogin = false;
  const navigate = useNavigate();

  // 검색 팝업 열고 닫기
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const closeSearchPopup = useCallback(() => {
    setShowSearchPopup(false);
  }, []);

  // 로그인 팝업 열고 닫기
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const closeLoginPopup = useCallback(() => {
    setShowLoginPopup(false);
  }, []);

  return (
    <Container scrollTop={scrollTop}>
      <Logo
        src={`${process.env.PUBLIC_URL}/assets/logoicon.svg`}
        alt="logo"
        onClick={() => navigate('/')}
      />
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
        {!isLogin && (
          <IoLogIn
            size="31"
            onClick={(e) => {
              e.stopPropagation();
              setShowLoginPopup(true);
            }}
          />
        )}
      </Toolbar>
      <Modal show={showSearchPopup} onCloseModal={closeSearchPopup}>
        <SearchPopup closeSearchPopup={closeSearchPopup} />
      </Modal>
      <Modal
        backgroundFilter
        show={showLoginPopup}
        onCloseModal={closeLoginPopup}
      >
        <LoginPopup closeLoginPopup={closeLoginPopup} />
      </Modal>
    </Container>
  );
}

export default Header;
