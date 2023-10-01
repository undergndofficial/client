import React, { useCallback, useState } from 'react';
import {
  MovieContainer,
  TagDiv,
  MovieListWrapper,
  MoviePosterDiv,
  ButtonWrapper,
  ScrollButton,
  TitleWrapper,
  TitleDiv,
  MovieTitleDiv,
  MovieWrapper,
  MovieInfoDiv,
} from './style';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useScroll from 'hooks/useScroll';
import Rating from 'react-star-ratings';

// 임시 데이터 타입
interface MovieListProps {
  tag: { label: string; iconUrl: string };
}

/**
 * 영화 목록 한 줄 컴포넌트
 */
function MovieList({ tag }: MovieListProps) {
  const { horizontalScrollRef, handleNextButtonClick } = useScroll();
  const [isScrollLeft, setIsScrollLeft] = useState(true);
  const [isScrollRight, setIsScrollRight] = useState(false);

  const onScrollMovieList = useCallback(() => {
    const scrollLeft = horizontalScrollRef.current?.scrollLeft || 0;
    const offsetRight =
      (horizontalScrollRef.current?.scrollWidth || 0) -
      (horizontalScrollRef.current?.offsetWidth || 0);
    setIsScrollRight(offsetRight <= scrollLeft);
    setIsScrollLeft(scrollLeft == 0);
  }, []);

  return (
    <div>
      <TitleWrapper>
        <TitleDiv visible={!isScrollLeft}>{tag.label}</TitleDiv>
        <ButtonWrapper>
          <ScrollButton
            visible={!isScrollLeft}
            nextType={'prev'}
            onClick={() => {
              handleNextButtonClick('prev');
            }}
          >
            <BsChevronLeft size="20" />
          </ScrollButton>
          <ScrollButton
            visible={!isScrollRight}
            nextType={'next'}
            onClick={() => {
              handleNextButtonClick('next');
            }}
          >
            <BsChevronRight size="20" />
          </ScrollButton>
        </ButtonWrapper>
      </TitleWrapper>
      <MovieContainer ref={horizontalScrollRef} onScroll={onScrollMovieList}>
        <TagDiv visible={isScrollLeft}>
          <img src={`${process.env.PUBLIC_URL}${tag.iconUrl}`} />
          <div>{tag.label}</div>
        </TagDiv>
        <MovieListWrapper>
          {[...Array(15)].map((_, i) => (
            <MovieWrapper>
              <MoviePosterDiv
                key={i}
                url="//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/qgRsG1ij_izEsjPW8fEiUpUnAaA.jpg"
              />
              <MovieTitleDiv>영화 제목</MovieTitleDiv>
              <MovieInfoDiv>
                <div>
                  <span>감독</span>
                  #카테고리 #장르 #장르
                </div>
                <Rating
                  rating={4.5}
                  starEmptyColor="grey"
                  starRatedColor={`var(--color-star${Math.floor(4.5)})`}
                  starDimension="1rem"
                  starSpacing="2px"
                />
              </MovieInfoDiv>
            </MovieWrapper>
          ))}
        </MovieListWrapper>
      </MovieContainer>
    </div>
  );
}

export default MovieList;
