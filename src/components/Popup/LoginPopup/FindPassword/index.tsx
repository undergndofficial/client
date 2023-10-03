import React from 'react';
import {
  Container,
  TitleDiv,
  FindWayDiv,
  FindIconWrapper,
  ContentDiv,
  BottomInfoWrapper,
} from './style';
import { IoMdMail } from 'react-icons/io';
import { IoCall } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

/**
 * 비밀번호 찾기 화면
 */
function FindPassword() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <TitleDiv>아이디 / 비밀번호 찾기</TitleDiv>
        <ContentDiv>
          <FindWayDiv>
            <FindIconWrapper>
              <IoCall />
            </FindIconWrapper>
            <span>전화번호 인증</span>
          </FindWayDiv>
          <FindWayDiv>
            <FindIconWrapper>
              <IoMdMail />
            </FindIconWrapper>
            <span>이메일 인증</span>
          </FindWayDiv>
        </ContentDiv>
      </Container>
      <BottomInfoWrapper>
        <div>문의</div>
        <div>고객센터</div>
        <div
          onClick={() => {
            navigate('/join');
          }}
        >
          회원가입
        </div>
      </BottomInfoWrapper>
    </>
  );
}

export default FindPassword;
