import styled from '@emotion/styled';
import theme from 'styles/theme';

export const MainPosterDiv = styled.div<{ url: string }>`
  width: 100%;
  height: 100vh;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  border-radius: 0rem 0rem 6.25rem 6.25rem;
`;

export const DetailButton = styled.div`
  text-align: center;
  padding: 1.5rem 3.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: var(--color-background);
  color: var(--color-font);
  border-radius: 50px;
  position: absolute;
  bottom: 15%;
  right: 15%;
  letter-spacing: 0.3rem;
  @media ${theme.device.phone} {
    bottom: 10%;
    right: 10%;
  }
  cursor: pointer;
`;

export const MovieListWrapper = styled.div`
  box-sizing: border-box;
  margin-top: 5rem;
  width: 100%;
  gap: 3rem;
  display: flex;
  flex-direction: column;
`;
