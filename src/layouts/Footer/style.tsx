import styled from '@emotion/styled';
import theme from 'styles/theme';

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
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 1.5rem;
  font-size: 0.75rem;
  @media ${theme.device.phone} {
    gap: 1rem;
  }
`;

export const ButtonListDiv = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 1rem;
  & div {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 3rem;
    border-right: 1px solid white;
    @media ${theme.device.phone} {
      border-right: none;
    }
  }
  & :last-child {
    border-right: none;
  }
  @media ${theme.device.phone} {
    flex-direction: column;
  }
`;

export const InfoWrapper = styled.div`
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`;

export const FlexWrapper = styled.div`
  display: flex;
  column-gap: 1.5rem;
  row-gap: 1rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  @media ${theme.device.phone} {
    flex-direction: column;
  }
`;

export const SnsIconWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  color: var(--color-font);
  cursor: pointer;
`;
