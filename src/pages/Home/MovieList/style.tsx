import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem;
  width: 100%;
  overflow-x: auto;
  padding: 0 1rem 0 5rem;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const Tag = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const MovieListWrapper = styled.div`
  display: flex;
  padding-right: 0px;
  align-items: flex-start;
  gap: 0.625rem;
  flex: 1 0 0;
  align-self: stretch;
`;

export const Movie = styled.div`
  width: 18.125rem;
  height: 10.1875rem;
  border-radius: 1.25rem;
  background-color: grey;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1.24rem;
  margin: 0 4rem 10px 0;
`;

export const ScrollButton = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
