import styled from '@emotion/styled';

export const MovieListWrapper = styled.div`
  display: grid;
  gap: 1.88rem;
  flex-wrap: wrap;
  justify-content: center;
  grid-template-columns: repeat(3, 1fr);
  @media (min-width: 823px) and (max-width: 1300px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 823px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const MoviePosterDiv = styled.div<{ url: string }>`
  max-width: 100%;
  height: 15.1875rem;
  border-radius: 1.25rem;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export const MovieWrapper = styled.div`
  width: 25rem;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MovieInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: space-between;
  font-size: 0.625rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  & span {
    font-size: 0.75rem;
    margin-right: 0.75rem;
  }
`;

export const MovieTitleDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
  max-width: 100%;
`;

export const CategoryDiv = styled.div`
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Container = styled.div`
  display: flex;
  padding: 8rem 0;
  flex-direction: column;
  gap: 4.5rem;
  justify-content: center;
  align-items: center;
`;

export const FestivalTitle = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
  word-break: keep-all;
`;

export const MainPosterDiv = styled.div<{ url: string }>`
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  border-radius: 0rem 0rem 6.25rem 6.25rem;
`;
