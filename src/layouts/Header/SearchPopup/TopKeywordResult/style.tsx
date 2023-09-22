import styled from '@emotion/styled';

export const EmptyResultDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  padding: 1.8rem;
`;

export const RecentKeywordWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 0 3rem;
  max-height: 14rem;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
  & img {
    margin-right: 7px;
  }
`;

export const RecentKeywordDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;
