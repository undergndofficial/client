import Layout from 'layouts/Layout';
import React from 'react';
import { useParams } from 'react-router-dom';
import PageContent from 'layouts/PageContent';
import { KeywordWrapper, ResultWrapper, NoResultTextDiv } from './style';
import SearchResultItem from './SearchResultItem';

/**
 * 검색 결과 페이지
 */
function SearchResult() {
  const { keyword } = useParams();
  // 임시 데이터
  const noReault = false;
  return (
    <Layout showFooter={false}>
      <PageContent>
        <KeywordWrapper>
          <div>"{keyword}"</div>
          {noReault && (
            <NoResultTextDiv>찾으시는 영화가 없을 땐?</NoResultTextDiv>
          )}
        </KeywordWrapper>
        <ResultWrapper>
          {[...Array(5)].map((_, i) => (
            <SearchResultItem key={i} />
          ))}
        </ResultWrapper>
      </PageContent>
    </Layout>
  );
}

export default SearchResult;
