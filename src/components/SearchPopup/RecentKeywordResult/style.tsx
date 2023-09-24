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
  gap: 0.8rem;
  padding: 0.5rem;
  max-height: 14rem;
  overflow: auto;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

export const RecentKeywordDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  font-weight: 700;
  cursor: pointer;
`;

export const DeleteButton = styled.div`
  color: #666;
  font-size: 1.4rem;
  font-weight: normal;
  cursor: pointer;
`;

export const AllDeleteButton = styled.div`
  display: flex;
  justify-content: end;
  cursor: pointer;
  color: #a7a7a7;
  font-size: 0.625rem;
  font-weight: 700;
  margin-top: 0.8rem;
`;
