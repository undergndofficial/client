import React from 'react';
import Layout from 'layouts/Layout';
import { MainPosterDiv, DetailButton, MovieListWrapper } from './style';
import MovieList from './MovieList';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * 메인 화면 페이지
 */
function Home() {
  const { t } = useTranslation();
  // 임시 데이터
  const tagList = [
    { label: '인기 영화', iconUrl: '/assets/icon/tag-popular.svg' },
    { label: '시청중', iconUrl: '/assets/icon/tag-watching.svg' },
    { label: '부산대', iconUrl: '/assets/icon/tag-busan.svg' },
    { label: '경성대', iconUrl: '/assets/icon/tag-kyungsung.svg' },
    { label: '동의대', iconUrl: '/assets/icon/tag-dongui.svg' },
  ];
  const navigate = useNavigate();
  // 임시
  const id = 1;

  return (
    <Layout>
      <MainPosterDiv url="https://blog.kakaocdn.net/dn/bUzgFU/btqH4sUMSK8/Aas3KFvbzbyr62OPIM9jXk/img.jpg">
        <DetailButton
          onClick={() => {
            navigate(`/player/${id}`);
          }}
        >
          {t('showDetail')}
        </DetailButton>
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
