import PageContent from 'layouts/PageContent';
import React, { useState, useEffect } from 'react';
import {
  BoardTable,
  Container,
  TitleDiv,
  WriteButton,
  StatusDot,
} from './style';
import Layout from 'layouts/Layout';
import theme from 'styles/theme';
import dayjs from 'dayjs';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router-dom';

function Inquiry() {
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(10);
  const statusColor = {
    done: '#24FF00',
    processing: '#FFC700',
    hold: '#FF0000',
  };

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

  const navigate = useNavigate();

  // 임시 데이터
  const total = 1;

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>1대1 문의 내역</TitleDiv>
          <WriteButton
            onClick={() => {
              navigate('/inquiry/write');
            }}
          >
            글쓰기
          </WriteButton>
          <BoardTable>
            <thead>
              <tr>
                <th>No</th>
                <th>문의 유형</th>
                <th>문의 제목</th>
                <th>문의 날짜</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>223</th>
                <th>문의 유형</th>
                <th>문의 제목입니다.</th>
                <th>{dayjs().format('YY.MM.DD')}</th>
                <th>
                  <StatusDot color={statusColor.done} />
                  접수 완료
                </th>
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

export default Inquiry;
