import React, { useEffect, useState } from 'react';
import Layout from 'layouts/FestivalLayout';
import {
  Container,
  MovieListWrapper,
  MoviePosterDiv,
  MovieTitleDiv,
  MovieWrapper,
  MovieInfoDiv,
  CategoryWrapper,
  // CategoryDiv,
  FestivalTitle,
} from './style';
import { useNavigate } from 'react-router-dom';
import useRequest from 'hooks/useRequest';
import { IFestivalMovie } from 'types/festival';
import { getFestivalMovieList } from 'api/festival';

/**
 * 영화제 페이지
 */
function Festival() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<IFestivalMovie[]>([]);
  const festId = 'CSUMB';
  const requestMovieList = useRequest<{
    totalcount: number;
    rs: IFestivalMovie[];
  }>(getFestivalMovieList);

  useEffect(() => {
    requestMovieList(festId)
      .then((data) => {
        setMovies(data.rs);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Layout>
      <Container>
        <FestivalTitle>CSUMB Online Film Festival</FestivalTitle>
        <MovieListWrapper>
          {movies.map((movie, i) => (
            <MovieWrapper
              key={i}
              onClick={() => {
                navigate(`/player/${movie.movSeq}`);
              }}
            >
              <MoviePosterDiv
                key={i}
                url="//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/qgRsG1ij_izEsjPW8fEiUpUnAaA.jpg"
              />
              <MovieTitleDiv>{movie.movTitleEn}</MovieTitleDiv>
              <MovieInfoDiv>
                <CategoryWrapper>
                  <span>{movie.director}</span>
                  {/* <CategoryDiv>
                    #카테고리 #장르 #장르 #카테고리 #장르 #장르 #카테고리 #장르
                    #장르 #카테고리 #장르 #장르
                  </CategoryDiv> */}
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
