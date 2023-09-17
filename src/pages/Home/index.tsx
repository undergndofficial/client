import React from 'react';
import Layout from 'layouts/Layout';
import { MainPosterDiv, DetailButton, MovieListWrapper } from './style';
import MovieList from './MovieList';

function Home() {
  return (
    <Layout>
      <MainPosterDiv url="https://blog.kakaocdn.net/dn/bUzgFU/btqH4sUMSK8/Aas3KFvbzbyr62OPIM9jXk/img.jpg">
        <DetailButton>자세히 보기</DetailButton>
      </MainPosterDiv>
      <MovieListWrapper>
        <MovieList />
      </MovieListWrapper>
    </Layout>
  );
}

export default Home;
