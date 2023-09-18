import React from 'react';
import Layout from 'layouts/Layout';
import { MainPosterDiv, DetailButton, MovieListWrapper } from './style';
import MovieList from './MovieList';

/**
 * 메인 화면 페이지
 */
function Home() {
  // 임시 데이터
  const tagList = [
    { label: '인기 영화', iconUrl: '/assets/tag-popular.svg' },
    { label: '시청중', iconUrl: '/assets/tag-watching.svg' },
    { label: '부산대', iconUrl: '/assets/tag-busan.svg' },
    { label: '경성대', iconUrl: '/assets/tag-kyungsung.svg' },
    { label: '동의대', iconUrl: '/assets/tag-dongui.svg' },
  ];

  return (
    <Layout>
      <MainPosterDiv url="https://blog.kakaocdn.net/dn/bUzgFU/btqH4sUMSK8/Aas3KFvbzbyr62OPIM9jXk/img.jpg">
        <DetailButton>자세히 보기</DetailButton>
      </MainPosterDiv>
      <MovieListWrapper>
        {tagList.map((tag) => (
          <MovieList key={tag.label} tag={tag} />
        ))}
      </MovieListWrapper>
    </Layout>
  );
}

export default Home;
