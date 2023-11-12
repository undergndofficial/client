import React from 'react';
import Layout from 'layouts/FestivalLayout';
import {
  Container,
  MovieListWrapper,
  MoviePosterDiv,
  MovieTitleDiv,
  MovieWrapper,
  MovieInfoDiv,
  CategoryWrapper,
  CategoryDiv,
  FestivalTitle,
} from './style';
import { useNavigate } from 'react-router-dom';

/**
 * 영화제 페이지
 */
function Festival() {
  const navigate = useNavigate();
  return (
    <Layout>
      <Container>
        <FestivalTitle>CSUMB Film Festival</FestivalTitle>
        <MovieListWrapper>
          {[...Array(15)].map((_, i) => (
            <MovieWrapper
              key={i}
              onClick={() => {
                navigate('/player/1');
              }}
            >
              <MoviePosterDiv
                key={i}
                url="//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/qgRsG1ij_izEsjPW8fEiUpUnAaA.jpg"
              />
              <MovieTitleDiv>영화 제목</MovieTitleDiv>
              <MovieInfoDiv>
                <CategoryWrapper>
                  <span>감독</span>
                  <CategoryDiv>
                    #카테고리 #장르 #장르 #카테고리 #장르 #장르 #카테고리 #장르
                    #장르 #카테고리 #장르 #장르
                  </CategoryDiv>
                </CategoryWrapper>
              </MovieInfoDiv>
            </MovieWrapper>
          ))}
        </MovieListWrapper>
      </Container>
    </Layout>
  );
}

export default Festival;
