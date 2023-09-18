import React, { useCallback, useState } from 'react';
import {
  MovieContainer,
  TagDiv,
  MovieListWrapper,
  Movie,
  ButtonWrapper,
  ScrollButton,
  TitleWrapper,
  TitleDiv,
} from './style';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import useScroll from 'hooks/useScroll';

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
            <Movie
              key={i}
              url="//t1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/14Fa/image/qgRsG1ij_izEsjPW8fEiUpUnAaA.jpg"
            />
          ))}
        </MovieListWrapper>
      </MovieContainer>
    </div>
  );
}

export default MovieList;
