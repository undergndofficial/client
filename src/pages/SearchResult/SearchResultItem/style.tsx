import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  width: 100%;
  cursor: pointer;
`;

export const PosterDiv = styled.div<{ url: string }>`
  width: 18.125rem;
  height: 10.1875rem;
  border-radius: 1.25rem;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
  position: relative;
  @media ${theme.device.phone} {
    width: 100%;
  }
`;

export const MovieInfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 700;
  gap: 0.8rem;
  flex: 1;
  padding: 1rem 0;
  @media ${theme.device.phone} {
    display: none;
  }
`;

export const DescriptionDiv = styled.div`
  color: #a7a7a7;
  height: 100%;
  max-height: 3.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 라인수 */
  -webkit-box-orient: vertical;
  word-wrap: break-word;
`;

export const TitleDiv = styled.div`
  font-size: 1.875rem;
`;

export const AdditionalInfoDiv = styled.div`
  font-size: 0.75rem;
  display: flex;
  gap: 0.8rem;
  color: #666;
  & div {
    display: inline-block;
  }
`;

export const WhiteFontDiv = styled.div`
  color: var(--color-font);
`;
