import React, { useEffect, useState } from 'react';
import {
  PaginationWrapper,
  PageButton,
  ButtonWrapper,
  PrevNextButton,
} from './style';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronRight,
  BsChevronLeft,
} from 'react-icons/bs';

type PaginationProps = {
  totalPage: number; // 전체 페이지 개수 (데이터 개수/한 페이지당 보여줄 데이터 개수)
  limitPage: number; // 하단에 한 번에 보여줄 페이지 수
  page: number; // 현재 페이지 번호
  setPage: React.Dispatch<React.SetStateAction<number>>; // 현재 페이지 번호 set 함수
};

/**
 * 페이징 컴포넌트
 */
export default function Pagination({
  totalPage,
  limitPage,
  page,
  setPage,
}: PaginationProps) {
  const [currentPageList, setCurrentPageList] = useState<Array<number>>([]);

  useEffect(() => {
    const start = Math.floor((page - 1) / limitPage) * limitPage + 1;
    const end = Math.ceil(page / limitPage) * limitPage;
    let pageCount = limitPage;
    if (totalPage < end) {
      pageCount = totalPage - start + 1;
    }
    setCurrentPageList(Array.from({ length: pageCount }, (_, i) => i + start));
  }, [page, limitPage, totalPage]);

  return (
    <PaginationWrapper>
      <PrevNextButton disabled={page === 1}>
        <div
          onClick={() => {
            if (page !== 1) setPage(1);
          }}
        >
          <BsChevronDoubleLeft />
        </div>
        <div
          onClick={() => {
            if (page !== 1) setPage(page - 1);
          }}
        >
          <BsChevronLeft />
        </div>
      </PrevNextButton>
      <ButtonWrapper>
        {currentPageList?.map((i) => (
          <PageButton key={i} onClick={() => setPage(i)} selected={page === i}>
            {i}
          </PageButton>
        ))}
      </ButtonWrapper>
      <PrevNextButton disabled={page === totalPage}>
        <div
          onClick={() => {
            if (page !== totalPage) setPage(page + 1);
          }}
        >
          <BsChevronRight />
        </div>
        <div
          onClick={() => {
            if (page !== totalPage) setPage(totalPage);
          }}
        >
          <BsChevronDoubleRight />
        </div>
      </PrevNextButton>
    </PaginationWrapper>
  );
}
