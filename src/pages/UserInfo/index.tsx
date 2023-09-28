import React from 'react';
import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import {
  Title,
  Container,
  InfoItemDiv,
  InfoItemWrapper,
  BottomButton,
} from './style';

/**
 * 계정 정보 페이지
 */
function UserInfo() {
  return (
    <Layout showFooter={false}>
      <PageContent>
        <Container>
          <div>
            <Title>기본 정보</Title>
            <InfoItemWrapper>
              <InfoItemDiv>
                <label>계정 이메일</label>
                <span>sailormoon917@naver.com</span>
                <button>변경</button>
              </InfoItemDiv>
              <InfoItemDiv>
                <label>비밀번호</label>
                <span>********</span>
                <button>변경</button>
              </InfoItemDiv>
              <InfoItemDiv>
                <label>전화번호</label>
                <span>010-2851-2740</span>
                <button>변경</button>
              </InfoItemDiv>
            </InfoItemWrapper>
          </div>
          <div>
            <Title>시청 데이터</Title>
            <InfoItemWrapper>
              <InfoItemDiv>
                <label>최근 시청목록</label>
                <span>최근 시청 영화 1 </span>
                <button>전체 시청 기록</button>
              </InfoItemDiv>
              <InfoItemDiv>
                <label>누적 시청시간</label>
                <span>238시간 57분(상위 10%)</span>
              </InfoItemDiv>
              <InfoItemDiv>
                <label>일별 시청 시간</label>
                <span>2023-03-02_11:52</span>
                <button>전체 시청 시간</button>
              </InfoItemDiv>
              <InfoItemDiv>
                <label>총 시청 편 수</label>
                <span>76 편</span>
              </InfoItemDiv>
              <BottomButton>장르별 시청 횟수 보기</BottomButton>
            </InfoItemWrapper>
          </div>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default UserInfo;
