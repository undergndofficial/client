import styled from '@emotion/styled';

export const Container = styled.footer`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  color: var(--color-font);
  gap: 3rem;
  padding: 1rem 1rem 8rem 1rem;
`;

export const ButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  width: 35%;
  row-gap: 1.2rem;
  column-gap: 4rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  & div {
    display: flex;
    align-items: center;
    gap: 4px;
  }
`;

export const InfoWrapper = styled.div`
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const FlexWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
`;
