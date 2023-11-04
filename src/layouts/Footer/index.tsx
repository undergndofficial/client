import React, { useCallback } from 'react';
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
import { useTranslation } from 'react-i18next';
import i18n from 'locales/i18n';

/**
 * 레이아웃 Footer
 */
function Footer() {
  const { t } = useTranslation();
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
          <div>{t('help')}</div>
          <div>{t('support')}</div>
          <div>{t('privacy')}</div>
          <div>{t('legalNotice')}</div>
        </ButtonListDiv>
        <ButtonListDiv>
          <div>about us</div>
          <div>{t('doInquiry')}</div>
          <div>{t('showUniversity')}</div>
        </ButtonListDiv>
      </ButtonWrapper>
      <InfoWrapper>
        <FlexWrapper>
          <div>{t('undergroud')}</div>
          <div>{t('lawNumber')}: 제 xXX-서울 종로-xxxx호</div>
          <div>{t('phone')}: xxx-xxxx-xxxx</div>
        </FlexWrapper>
        <div>{t('ceo')}: 문지욱</div>
        <div>{t('emailAddress')}: undergndofficial@gmaill.com</div>
        <div>{t('address')}: 충북 제천시 한수면 봉화재길 517</div>
        <div>{t('companyNumber')}: xxx-xx-xxxxx</div>
        <div>{t('cloudHosting')}: Amazon Web Sevices Inc.</div>
        <div>{t('fairTradeCommissionWebsite')}: https://www.ftc.go.kr/</div>
        <FlexWrapper>
          <div
            onClick={() => {
              i18n.changeLanguage('ko');
            }}
          >
            KO
          </div>
          <div
            onClick={() => {
              i18n.changeLanguage('en');
            }}
          >
            EN
          </div>
        </FlexWrapper>
      </InfoWrapper>
    </Container>
  );
}

export default Footer;
