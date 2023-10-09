import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React, { useEffect, useState } from 'react';
import { Container, TitleDiv, BoardTable } from './style';
import dayjs from 'dayjs';
import Pagination from 'components/Pagination';
import theme from 'styles/theme';
import { useNavigate } from 'react-router-dom';

function Notice() {
  const PAGE_SIZE = 10;
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

  // 임시 데이터
  const total = 1;

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>공지사항</TitleDiv>
          <BoardTable>
            <thead>
              <tr>
                <th>No</th>
                <th>제목</th>
                <th>등록일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              <tr
                onClick={() => {
                  navigate(`/notice/${1}`);
                }}
              >
                <th>223</th>
                <th>제 1회 국제 대학 독립영화제 개최 안내</th>
                <th>{dayjs().format('YY.MM.DD')}</th>
                <th>439</th>
              </tr>
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
