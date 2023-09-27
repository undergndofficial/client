import React from 'react';
import {
  Container,
  ButtonWrapper,
  InfoWrapper,
  FlexWrapper,
  ButtonListDiv,
  SnsIconWrapper,
} from './style';
import {
  IoLogoYoutube,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoFacebook,
} from 'react-icons/io5';

/**
 * 레이아웃 Footer
 */
function Footer() {
  const ICON_SIZE = 21;
  return (
    <Container>
      <SnsIconWrapper>
        <IoLogoYoutube size={ICON_SIZE} />
        <IoLogoInstagram size={ICON_SIZE} />
        <IoLogoTwitter size={ICON_SIZE} />
        <IoLogoFacebook size={ICON_SIZE} />
      </SnsIconWrapper>
      <ButtonWrapper>
        <ButtonListDiv>
          <div>고객센터</div>
          <div>후원</div>
          <div>개인정보</div>
          <div>법적고지</div>
        </ButtonListDiv>
        <ButtonListDiv>
          <div>about us</div>
          <div>문의하기</div>
          <div>대학 한눈에보기</div>
        </ButtonListDiv>
      </ButtonWrapper>
      <InfoWrapper>
        <FlexWrapper>
          <div>언더그라운드</div>
          <div> 통신판매법 신고번호: 제 xXX-서울 종로-xxxx호</div>
          <div> 전화번호: xxx-xxxx-xxxx</div>
        </FlexWrapper>
        <div>대표: 문지욱</div>
        <div>이메일주소: undergndofficial@gmaill.com</div>
        <div>주소: 충북 제천시 한수면 봉화재길 517</div>
        <div>사업자 등록 번호: xxx-xx-xxxxx</div>
        <div>클라우드 호스팅: Amazon Web Sevices Inc.</div>
        <div>공정거래위원회 웹사이트: https://www.ftc.go.kr/</div>
      </InfoWrapper>
    </Container>
  );
}

export default Footer;
