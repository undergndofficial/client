import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React from 'react';
import { TitleDiv } from '../style';
import { PostNumberDiv, PostHeaderDiv, PostContentDiv } from './style';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

function Detail() {
  const { t } = useTranslation();
  return (
    <Layout>
      <PageContent>
        <PostNumberDiv>No.223</PostNumberDiv>
        <TitleDiv>제 1회 국제 대학 독립영화제 개최 안내</TitleDiv>
        <PostHeaderDiv>
          <div>{t('content')}</div>
          <div>
            {t('registerDate')}: {dayjs().format('YY.MM.DD')}
          </div>
          <div>{t('views')}: 134</div>
        </PostHeaderDiv>
        <PostContentDiv>
          안녕하세요! 저희는 언더그라운드드에서 독립영화를 지지하고 발전시키기
          위해 제 1회 국제 대학 독립영화제를 개최하게 되어 기쁘게 생각합니다.
          <br />이 자리를 빌어 독립영화제에 대한 공지사항을 알려드리고자 합니다.
          아래는 상세 정보입니다.
          <br />
          <br /> 일자: 23.8.9. 10:00 ~ 23.8.11(3일간) <br />
          장소: 충북 제천시 한수면 봉화재길 597 <br />
          참가 신청: 링크 참고(www.undergnd.com/c/dfhle/162348856) <br />
          <br />제 1회 국제 대학 독립영화제는 독립영화를 위한 플랫폼을 제공하여
          새로운 작품과 창작자들이 자신의 아이디어와 열정을 세상과 나눌 수 있는
          기회를 제공합니다. 우리는 참가자들이 독립영화의 다양성과 예술적 가치를
          지지하며 독창적이고 감동적인 작품을 발표할 것을 기대합니다.
          <br />
          언더그라운드는 다양한 장르와 주제의 독립영화를 대상으로 합니다.
          장편·단편 영화, 다큐멘터리, 애니메이션 등 모든 형식의 독립작품을
          환영합니다. 참가자들은 자신의 작품을 신청하고 평가받을 수 있으며,
          우수한 작품은 시상을 통해 인정과 상장을 받게 됩니다. <br />더 자세한
          정보와 참가 신청 방법은 곧 언더그라운드의
          웹사이트(www.undergnd.com/c/dfhle/162348856)를 통해 공개될 예정입니다.
          독립영화를 사랑하고 지지하는 여러분의 많은 관심과 참여를 기다립니다.
          감사합니다. <br />
          <br />
          언더그라운드 기획팀 문지욱 드림
        </PostContentDiv>
      </PageContent>
    </Layout>
  );
}

export default Detail;
