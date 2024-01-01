import React, { useEffect, useState } from 'react';
import Layout from 'layouts/Layout';
import {
  Container,
  MovieListWrapper,
  MoviePosterDiv,
  MovieTitleDiv,
  MovieWrapper,
  MovieInfoDiv,
  FestivalTitle,
  // MainPosterDiv,
  CategoryDiv,
} from './style';
import { useNavigate } from 'react-router-dom';
import useRequest from 'hooks/useRequest';
import { IFestival, IFestivalMovie } from 'types/festival';
import { getFestivalInfo, getFestivalMovieList } from 'api/festival';
import { isEmpty } from 'lodash';

/**
 * 영화제 페이지
 */
function Festival() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<IFestivalMovie[]>([]);
  const [festival, setFestival] = useState<IFestival | null>(null);
  const festId = 'CSUMB';
  const requestMovieList = useRequest<{
    totalcount: number;
    rs: IFestivalMovie[];
  }>(getFestivalMovieList);
  const requestFestInfo = useRequest<IFestival[]>(getFestivalInfo);

  useEffect(() => {
    requestMovieList(festId)
      .then((data) => {
        setMovies(data.rs);
      })
      .catch((e) => {
        console.error(e);
      });
    requestFestInfo(festId)
      .then((data) => {
        if (!isEmpty(data)) {
          setFestival(data[0]);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Layout showFooter={true}>
      {/* <MainPosterDiv url="https://storage.googleapis.com/movie_additional/festival/cover/f_1.jpg" /> */}
      <Container>
        <FestivalTitle>{festival?.festivalName}</FestivalTitle>
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
                url="https://storage.googleapis.com/movie_additional/festival/cover/f_1.jpg"
              />
              <MovieTitleDiv>{movie.movTitle}</MovieTitleDiv>
              <MovieInfoDiv>
                <CategoryDiv>{movie.director}</CategoryDiv>
              </MovieInfoDiv>
            </MovieWrapper>
          ))}
        </MovieListWrapper>
      </Container>
    </Layout>
  );
}

export default Festival;
