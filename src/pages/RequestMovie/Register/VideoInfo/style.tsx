import styled from '@emotion/styled';
import theme from 'styles/theme';

export const SubtitleListDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;
  margin-left: 11.5rem;
  @media ${theme.device.phone}, ${theme.device.tablet} {
    margin-left: 0;
  }
`;

export const SubtitleDiv = styled.div`
  display: flex;
  padding: 0.2rem 0.8rem;
  align-items: center;
  justify-content: space-between;
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
