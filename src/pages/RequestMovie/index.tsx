import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React from 'react';
import {
  ButtonWrapper,
  Container,
  RequestButton,
  TitleDiv,
  DescriptionDiv,
  ButtonTitleDiv,
  ButtonIconDiv,
} from './style';
import { useNavigate } from 'react-router-dom';

function RequestMovie() {
  const navigate = useNavigate();

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>영화 신청</TitleDiv>
          <ButtonWrapper>
            <RequestButton
              onClick={() => {
                navigate('/request-movie/requset');
              }}
            >
              <ButtonIconDiv
                url={`${process.env.PUBLIC_URL}/assets/icon/request-icon.svg`}
              />
              <ButtonTitleDiv>영화 요청</ButtonTitleDiv>
              <DescriptionDiv>
                일반 사용자 분들이 보고 싶은 영화가 있을 때 이용해주세요
              </DescriptionDiv>
            </RequestButton>
            <RequestButton
              onClick={() => {
                navigate('/request-movie/register');
              }}
            >
              <ButtonIconDiv
                url={`${process.env.PUBLIC_URL}/assets/icon/register-icon.svg`}
              />
              <ButtonTitleDiv>영화 등록 신청</ButtonTitleDiv>
              <DescriptionDiv>
                영화 제작자 분들이 자신의 영화를 등록하고 싶을 때 이용해주세요
              </DescriptionDiv>
            </RequestButton>
          </ButtonWrapper>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default RequestMovie;
