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
    <Layout>
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
