import PageContent from 'layouts/PageContent';
import React, { useState, useEffect, useCallback } from 'react';
import {
  BoardTable,
  Container,
  TitleDiv,
  WriteButton,
  StatusDot,
  StatusText,
} from './style';
import Layout from 'layouts/Layout';
import theme from 'styles/theme';
import dayjs from 'dayjs';
import Pagination from 'components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useRequest from 'hooks/useRequest';
import { IQna, IUserSession } from 'types/db';
import { getQnaList } from 'api/customer';
import { IPagingData } from 'types/common';
import { getUserInfo } from 'api/member';
import { QueryFunctionContext, QueryKey, useQuery } from 'react-query';

function Inquiry() {
  const { t } = useTranslation();
  const [qnaList, setQnaList] = useState<IQna[]>([]);
  const [total, setTotal] = useState(0);
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const [limitPage, setLimitPage] = useState(10);
  const statusColor = {
    done: '#24FF00',
    processing: '#FFC700',
    hold: '#FF0000',
  };

  // 로그인한 사용자 정보. 내가 쓴 글인지 판별할 때 사용
  const requsetUserInfo = useRequest<IUserSession>(getUserInfo);
  const { data: loginUser } = useQuery<IUserSession | null>(
    'loginuser',
    requsetUserInfo,
  );

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

  // 일대일 문의 글 목록
  const requestQnaList = useRequest<IPagingData<IQna>>(getQnaList);
  const { data: qnaInfo } = useQuery<IPagingData<IQna>>({
    queryKey: ['get-qna-list', { page, step: PAGE_SIZE }],
    queryFn: (context: QueryFunctionContext<QueryKey, unknown>) => {
      return requestQnaList(context.queryKey[1]);
    },
  });
  useEffect(() => {
    if (!qnaInfo) return;
    setTotal(qnaInfo.totalcount);
    setQnaList(qnaInfo.list);
  }, [qnaInfo]);

  // 1대1문의 행 클릭
  const clickPost = useCallback(
    (qna: IQna) => {
      console.log(loginUser, qna);
      if (loginUser?.memSeq === qna.memSeq) {
        // 내가 쓴 글인 경우
        navigate(`/inquiry/write/${qna.seq}`);
      } else {
        // 내가 쓴 글이 아닌 경우
        navigate(`/inquiry/${qna.seq}`);
      }
    },
    [loginUser],
  );

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>{`${t('oneToOneInquiry')} ${t('list')}`}</TitleDiv>
          <WriteButton
            onClick={() => {
              navigate('/inquiry/write');
            }}
          >
            {t('write')}
          </WriteButton>
          <BoardTable>
            <thead>
              <tr>
                <th>No</th>
                <th>{t('inquiryType')}</th>
                <th>{t('inquiryTitle')}</th>
                <th>{t('inquiryDate')}</th>
                <th>{t('status')}</th>
              </tr>
            </thead>
            <tbody>
              {qnaList.map((qna) => (
                <tr
                  key={qna.seq}
                  onClick={() => {
                    clickPost(qna);
                  }}
                >
                  <th>{qna.seq}</th>
                  <th>{qna.inqTxt}</th>
                  <th>{qna.inqTitle}</th>
                  <th>{dayjs(qna.inqAt).format('YY.MM.DD')}</th>
                  <th>
                    <StatusDot
                      color={
                        qna.repAt ? statusColor.done : statusColor.processing
                      }
                    />
                    <StatusText>
                      {qna.repAt ? t('answerDone') : t('noAnswer')}
                    </StatusText>
                  </th>
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

export default Inquiry;
