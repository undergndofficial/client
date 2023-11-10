import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React, { useEffect, useState } from 'react';
import { TitleDiv } from '../style';
import { PostNumberDiv, PostHeaderDiv, PostContentDiv } from './style';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getQnaDetail } from 'api/customer';
import useRequest from 'hooks/useRequest';
import { IQna } from 'types/db';

function Detail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [qna, setQna] = useState<IQna | null>(null);
  // 일대일 문의 상세
  const requestNotice = useRequest<IQna>(getQnaDetail);
  useEffect(() => {
    requestNotice(id)
      .then((data) => {
        setQna(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <Layout>
      <PageContent>
        <PostNumberDiv>{qna?.inqTxt}</PostNumberDiv>
        <TitleDiv>{qna?.inqTitle}</TitleDiv>
        <PostHeaderDiv>
          <div>{t('content')}</div>
          <div>
            {t('registerDate')}: {dayjs(qna?.inqAt).format('YY.MM.DD')}
          </div>
        </PostHeaderDiv>
        <PostContentDiv>{qna?.inqBody}</PostContentDiv>
      </PageContent>
    </Layout>
  );
}

export default Detail;
