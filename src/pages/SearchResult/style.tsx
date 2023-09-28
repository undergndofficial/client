import styled from '@emotion/styled';

export const KeywordWrapper = styled.div`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  padding: 0 1.5rem;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  row-gap: 1rem;
  column-gap: 0.5rem;
  align-items: end;
  flex-wrap: wrap;
  & div {
    word-break: break-all;
  }
`;

export const ResultWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  padding: 2rem;
`;

export const NoResultTextDiv = styled.div`
  font-size: 1rem;
`;
