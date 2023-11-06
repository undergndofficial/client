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
import { useTranslation } from 'react-i18next';

function RequestMovie() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>{t('movieApplication')}</TitleDiv>
          <ButtonWrapper>
            <RequestButton
              onClick={() => {
                navigate('/request-movie/requset');
              }}
            >
              <ButtonIconDiv
                url={`${process.env.PUBLIC_URL}/assets/icon/request-icon.svg`}
              />
              <ButtonTitleDiv>{t('requestMovie')}</ButtonTitleDiv>
              <DescriptionDiv>{t('message.message42')}</DescriptionDiv>
            </RequestButton>
            <RequestButton
              onClick={() => {
                navigate('/request-movie/register');
              }}
            >
              <ButtonIconDiv
                url={`${process.env.PUBLIC_URL}/assets/icon/register-icon.svg`}
              />
              <ButtonTitleDiv>{t('reigsterMovie')}</ButtonTitleDiv>
              <DescriptionDiv>{t('message.message43')}</DescriptionDiv>
            </RequestButton>
          </ButtonWrapper>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default RequestMovie;
