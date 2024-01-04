import React from 'react';
import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import {
  Title,
  Container,
  InfoItemDiv,
  InfoItemWrapper,
  // BottomButton,
} from './style';
import { useTranslation } from 'react-i18next';
// import useRequest from 'hooks/';
// import { getMemberInfo } from 'api/member';
// import { IUser } from 'types/db';

/**
 * 계정 정보 페이지
 */
function UserInfo() {
  const { t } = useTranslation();
  // 유저 정보
  // const requestUserInfo = useRequest<IUser>(getMemberInfo);
  // const [userInfo, setUserInfo] = useState({});
  // useEffect(() => {
  //   requestUserInfo().then((data) => {
  //     setUserInfo(data);
  //   });
  // }, []);

  return (
    <Layout showFooter={false}>
      <PageContent>
        <Container>
          <div>
            <Title>{t('basicInfo')}</Title>
            <InfoItemWrapper>
              <InfoItemDiv>
                <label>{t('name')}</label>
                <span>이름</span>
                {/* <button>{t('modify2')}</button> */}
              </InfoItemDiv>
              <InfoItemDiv>
                <label>{t('id')}</label>
                <span>아이디</span>
                {/* <button>{t('modify2')}</button> */}
              </InfoItemDiv>
              <InfoItemDiv>
                <label>{t('email')}</label>
                <span>sailormoon917@naver.com</span>
                {/* <button>{t('modify2')}</button> */}
              </InfoItemDiv>
              <InfoItemDiv>
                <label>{t('password')}</label>
                <span>********</span>
                {/* <button>{t('modify2')}</button> */}
              </InfoItemDiv>
              <InfoItemDiv>
                <label>{t('phone')}</label>
                <span>010-2851-2740</span>
                {/* <button>{t('modify2')}</button> */}
              </InfoItemDiv>
            </InfoItemWrapper>
          </div>
          {/* <div>
            <Title>{t('viewData')}</Title>
            <InfoItemWrapper>
              <InfoItemDiv>
                <label>{t('recentViewList')}</label>
                <span>최근 시청 영화 1 </span>
                <button>{t('allViewHistory')}</button>
              </InfoItemDiv>
              <InfoItemDiv>
                <label>{t('totalViewTime')}</label>
                <span>
                  238{t('hour')} 57{t('minute')} ({t('top')} 10%)
                </span>
              </InfoItemDiv>
              <InfoItemDiv>
                <label>{t('dailyViewTime')}</label>
                <span>2023-03-02_11:52</span>
                <button>{t('allViewTime')}전체 시청 시간</button>
              </InfoItemDiv>
              <InfoItemDiv>
                <label>{t('totalViewCount')}</label>
                <span>76 {t('movieConut')}</span>
              </InfoItemDiv>
              <BottomButton>{t('showViewCountByGerne')}</BottomButton>
            </InfoItemWrapper>
          </div> */}
        </Container>
      </PageContent>
    </Layout>
  );
}

export default UserInfo;
