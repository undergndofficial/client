import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React, { useEffect, useState } from 'react';
import { TitleDiv } from '../style';
import { PostNumberDiv, PostHeaderDiv, PostContentDiv } from './style';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getAnnounceDetail } from 'api/customer';
import useRequest from 'hooks/useRequest';
import { IAnnounce } from 'types/db';
import { isEmpty } from 'lodash';
import { QueryFunctionContext, QueryKey, useQuery } from 'react-query';

function Detail() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [notice, setNotice] = useState<IAnnounce | null>(null);
  // 공지사항 상세
  const requestNotice = useRequest<IAnnounce[]>(getAnnounceDetail);
  const { data: noticeInfo } = useQuery<IAnnounce[]>({
    queryKey: ['get-notice', { id }],
    queryFn: (context: QueryFunctionContext<QueryKey, unknown>) => {
      const [, queryParams] = context.queryKey as [string, { id: string }];
      return requestNotice(queryParams.id);
    },
  });
  useEffect(() => {
    if (!noticeInfo || isEmpty(noticeInfo)) return;
    setNotice(noticeInfo[0]);
  }, [noticeInfo]);

  return (
    <Layout>
      <PageContent>
        <PostNumberDiv>No.{notice?.seq}</PostNumberDiv>
        <TitleDiv>{notice?.annTitle}</TitleDiv>
        <PostHeaderDiv>
          <div>{t('content')}</div>
          <div>
            {t('registerDate')}: {dayjs(notice?.createdAt).format('YY.MM.DD')}
          </div>
          <div>
            {t('views')}: {notice?.hits}
          </div>
        </PostHeaderDiv>
        <PostContentDiv>{notice?.annBody}</PostContentDiv>
      </PageContent>
    </Layout>
  );
}

export default Detail;
