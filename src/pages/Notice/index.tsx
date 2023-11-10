import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React, { useEffect, useState } from 'react';
import { Container, TitleDiv, BoardTable } from './style';
import dayjs from 'dayjs';
import Pagination from 'components/Pagination';
import theme from 'styles/theme';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IAnnounce } from 'types/db';
import { getAnnounceList } from 'api/customer';
import useRequest from 'hooks/useRequest';
import { IPagingData } from 'types/common';

function Notice() {
  const { t } = useTranslation();
  const [noticeList, setNoticeList] = useState<IAnnounce[]>([]);
  const PAGE_SIZE = 10;
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(10);
  const navigate = useNavigate();

  // 반응형 쿼리. 화면 크기에 따라 다른 페이지 수 제공
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `${theme.device.phone}, ${theme.device.tablet}`,
    );
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);
  useEffect(() => {
    if (isMobile) {
      setLimitPage(5);
    } else {
      setLimitPage(10);
    }
  }, [isMobile]);

  // 공지사항 목록
  const requestNoticeList = useRequest<IPagingData<IAnnounce>>(getAnnounceList);
  useEffect(() => {
    requestNoticeList({ step: PAGE_SIZE, page })
      .then((data) => {
        setNoticeList(data.list);
        setTotal(data.totalcount);
      })
      .catch((e) => console.error(e));
  }, [page]);

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>{t('notice')}</TitleDiv>
          <BoardTable>
            <thead>
              <tr>
                <th>No</th>
                <th>{t('title')}</th>
                <th>{t('registerDate')}</th>
                <th>{t('views')}</th>
              </tr>
            </thead>
            <tbody>
              {noticeList.map((notice) => (
                <tr
                  key={notice.seq}
                  onClick={() => {
                    navigate(`/notice/${notice.seq}`);
                  }}
                >
                  <th>{notice.seq}</th>
                  <th>{notice.annTitle}</th>
                  <th>{dayjs(notice.createdAt).format('YY.MM.DD')}</th>
                  <th>{notice.hits}</th>
                </tr>
              ))}
            </tbody>
          </BoardTable>
          {Math.ceil(total / PAGE_SIZE) > 1 && (
            <Pagination
              totalPage={Math.ceil(total / PAGE_SIZE)}
              limitPage={limitPage}
              page={page}
              setPage={setPage}
            />
          )}
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Notice;
