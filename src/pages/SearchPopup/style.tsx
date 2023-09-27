import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  position: absolute;
  width: 37.5rem;
  top: 0.6rem;
  right: 8rem;
  display: inline-flex;
  flex-direction: column;
  border-radius: 1.875rem;
  background: #0c0c0f;
  padding: 1rem;
  gap: 0.8rem;
  max-height: 25rem;
  box-sizing: border-box;
  @media ${theme.device.phone}, ${theme.device.tablet} {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    border-radius: 0;
    cursor: pointer;
  }
`;

export const SearchInputForm = styled.form`
  display: flex;
  align-items: center;
  .mobile-button {
    display: none;
    @media ${theme.device.phone}, ${theme.device.tablet} {
      display: block;
    }
  }
  @media ${theme.device.phone}, ${theme.device.tablet} {
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem;
  }
  & input {
    width: 100%;
    color: var(--color-font);
    font-size: 1.1rem;
    font-weight: 700;
    background: #0c0c0f;
    border: none;
    padding: 0.5rem;
    @media ${theme.device.phone}, ${theme.device.tablet} {
      border-radius: 1.25rem;
      background: #272727;
      height: 2.8rem;
      padding: 0 2rem;
    }
  }
  & button {
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: none;
    z-index: 999;
    cursor: pointer;
    @media ${theme.device.phone}, ${theme.device.tablet} {
      display: none;
    }
  }
`;
