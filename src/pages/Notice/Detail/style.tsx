import styled from '@emotion/styled';

export const PostNumberDiv = styled.div`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 500;
`;

export const PostHeaderDiv = styled.div`
  display: flex;
  border-top: 2px solid #535353;
  padding: 0.9rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: center;
  & div:nth-of-type(1) {
    flex-grow: 1;
  }
  & div:nth-of-type(2) {
    width: 9rem;
  }
  & div:nth-of-type(3) {
    width: 5rem;
  }
`;

export const PostContentDiv = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 1.5;
`;
