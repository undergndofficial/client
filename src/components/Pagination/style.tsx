import styled from '@emotion/styled';

export const PaginationWrapper = styled.div`
  display: flex;
  cursor: pointer;
  gap: 0.5rem;
  font-weight: 400;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PageButton = styled.div<{ selected: boolean }>`
  padding: 0 1rem;
  font-weight: ${(props) => (props.selected ? '700' : '')};
  color: ${(props) => (props.selected ? 'white' : '#a6a6a6')};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  cursor: pointer;
`;

export const PrevNextButton = styled.button`
  display: flex;
  gap: 1rem;
  text-align: center;
  color: var(--color-font);
  letter-spacing: 0.0625rem;
  margin: 0 0.7rem 0 0.7rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:disabled {
    color: #a6a6a6;
  }
`;
