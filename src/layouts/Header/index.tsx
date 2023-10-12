import React, { useState, useCallback } from 'react';
import { Container, Logo, Toolbar, UserPopupDiv } from './style';
import { FaSearch, FaUser } from 'react-icons/fa';
import { IoLogIn } from 'react-icons/io5';
import SearchPopup from 'components/Popup/SearchPopup';
import { useNavigate } from 'react-router-dom';
import Modal from 'layouts/Modal';
import LoginPopup from 'components/Popup/LoginPopup';

interface HeaderPropsType {
  scrollTop: boolean;
}
/**
 * 레이아웃 헤더
 */
function Header({ scrollTop }: HeaderPropsType) {
  // 임시 데이터
  const isLogin = true;
  const navigate = useNavigate();

  // 사용자 설정 팝업 열고 닫기
  const [showUserPopup, setShowUserPopup] = useState(false);
  const closeUserPopup = useCallback(() => {
    setShowUserPopup(false);
  }, []);

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
        src={`${process.env.PUBLIC_URL}/assets/icon/logo-icon.svg`}
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
          className="search-icon"
        />
        {isLogin && (
          <FaUser
            size="21"
            onClick={(e) => {
              e.stopPropagation();
              setShowUserPopup((prev) => !prev);
            }}
          />
        )}
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
      <Modal show={showUserPopup} onCloseModal={closeUserPopup}>
        <UserPopupDiv>
          <div
            onClick={() => {
              navigate('/mypage');
              closeUserPopup();
            }}
          >
            계정 및 설정
          </div>
          <div>찜목록</div>
          <div
            onClick={() => {
              navigate('/customer');
            }}
          >
            고객센터
          </div>
          <div
            onClick={() => {
              navigate('/request-movie');
            }}
          >
            영화 신청
          </div>
          <div>로그아웃</div>
          <div
            onClick={() => {
              navigate('/join');
            }}
          >
            회원가입(임시)
          </div>
        </UserPopupDiv>
      </Modal>
    </Container>
  );
}

export default Header;
