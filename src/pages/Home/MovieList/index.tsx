import React from 'react';
import {
  Container,
  Tag,
  MovieListWrapper,
  Movie,
  ButtonWrapper,
  ScrollButton,
} from './style';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

function MovieList() {
  return (
    <div>
      <ButtonWrapper>
        <ScrollButton>
          <BsChevronLeft size="20" />
        </ScrollButton>
        <ScrollButton>
          <BsChevronRight size="20" />
        </ScrollButton>
      </ButtonWrapper>
      <Container>
        <Tag>
          <img src={`${process.env.PUBLIC_URL}assets/tag-popular.svg`} />
          <div>인기 영화</div>
        </Tag>
        <MovieListWrapper>
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
          <Movie />
        </MovieListWrapper>
      </Container>
    </div>
  );
}

export default MovieList;
