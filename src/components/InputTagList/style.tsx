import styled from '@emotion/styled';

export const TagListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  row-gap: 0.5rem;
  width: 100%;
`;

export const TagDiv = styled.div`
  display: flex;
  padding: 0.2rem 0.8rem;
  align-items: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  background: #2f2f2f;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  & div {
    font-size: 1.3rem;
    color: #4a4a4a;
    cursor: pointer;
  }
`;
