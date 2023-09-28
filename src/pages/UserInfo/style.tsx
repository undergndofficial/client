import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  padding: 0 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  @media ${theme.device.phone} {
    padding: 0 0.75rem;
  }
`;

export const InfoItemDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 1.88rem 0;
  gap: 0.2rem;
  row-gap: 0.8rem;
  font-size: 1.2rem;
  flex-wrap: wrap;
  & label {
    width: 7.3rem;
    color: #a7a7a7;
    font-weight: 700;
  }
  & span {
    font-weight: 500;
    flex-grow: 1;
    margin-left: 20%;
  }
  & button {
    display: flex;
    padding: 0.625rem 1.25rem;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    background: #2f2f2f;
    border: none;
    color: var(--color-font);
    font-weight: 700;
    box-sizing: border-box;
    cursor: pointer;
  }
  @media ${theme.device.tablet} {
    font-size: 1.1rem;
    & span {
      margin-left: 0;
    }
  }
  @media ${theme.device.phone} {
    padding: 1.3rem 0;
    font-size: 0.8rem;
    & span {
      margin-left: 0;
    }
    & label {
      width: 6rem;
    }
  }
`;

export const InfoItemWrapper = styled.div`
  margin-top: 2.5rem;
  & div {
    border-bottom: 1px solid #666;
  }
  & :last-child {
    border-bottom: none;
  }
`;

export const Title = styled.div`
  display: flex;
  padding: 1.25rem 0rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.25rem;
  border: 1px solid #666;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  @media ${theme.device.phone} {
    border-radius: 5rem;
    padding: 0.7rem 0rem;
    font-size: 1.3rem;
  }
`;

export const BottomButton = styled.button`
  display: flex;
  padding: 0.625rem 1.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: #2f2f2f;
  border: none;
  color: var(--color-font);
  font-weight: 700;
  box-sizing: border-box;
  margin-top: 2.5rem;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    width: 80%;
  }
`;
