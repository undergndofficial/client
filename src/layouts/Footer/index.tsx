import React from 'react';
import { Container, ButtonWrapper, InfoWrapper, FlexWrapper } from './style';

/**
 * 레이아웃 Footer
 */
function Footer() {
  return (
    <Container>
      <ButtonWrapper>
        <div>고객센터</div>
        <div>후원</div>
        <div>개인정보</div>
        <div>법적고지</div>
        <div>about us</div>
        <div>문의하기</div>
        <div>대학 한눈에보기</div>
      </ButtonWrapper>
      <InfoWrapper>
        <FlexWrapper>
          <div>언더그라운드</div>
          <div> 통신판매법 신고번호 : 123456</div>
          <div> 전화번호:01062740069</div>
        </FlexWrapper>
        <div>대표: 문지욱</div>
        <div>이메일주소: sallormoon917@naver.com</div>
        <div>주소: 충북 제천시 한수면 봉화재길 517</div>
        <div>사업자 등록 번호: 123456</div>
        <div>클라우드 호스팅: Amazon Web Sevices Inc.</div>
        <div>공정거래위원회 웹사이트: 12356789</div>
      </InfoWrapper>
    </Container>
  );
}

export default Footer;
