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
import { useTranslation } from 'react-i18next';

/**
 * 비밀번호 찾기 화면
 */
function FindPassword() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <Container>
        <TitleDiv>{t('findIdPassword')}</TitleDiv>
        <ContentDiv>
          <FindWayDiv>
            <FindIconWrapper>
              <IoCall />
            </FindIconWrapper>
            <span>{`${t('phone')} ${t('auth')}`}</span>
          </FindWayDiv>
          <FindWayDiv>
            <FindIconWrapper>
              <IoMdMail />
            </FindIconWrapper>
            <span>{`${t('email')} ${t('auth')}`}</span>
          </FindWayDiv>
        </ContentDiv>
      </Container>
      <BottomInfoWrapper>
        <div>{t('inquiry')}</div>
        <div>{t('help')}</div>
        <div
          onClick={() => {
            navigate('/join');
          }}
        >
          {t('register')}
        </div>
      </BottomInfoWrapper>
    </>
  );
}

export default FindPassword;
