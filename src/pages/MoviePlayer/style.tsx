import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  place-content: center;
  color: var(--color-font);
  width: 100%;
  box-sizing: border-box;
  cursor: pointer;
`;

export const MovieInfo = styled.div`
  margin-top: 2.5rem;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  box-sizing: border-box;
`;

export const TitleDiv = styled.div`
  font-size: 3.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const DescriptionDiv = styled.div`
  flex-shrink: 0;
  align-self: stretch;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.375rem;
  display: flex;
  align-items: start;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 2rem;
  .description {
    width: 80%;
    @media ${theme.device.tablet}, ${theme.device.phone} {
      width: 100%;
    }
  }
`;

export const RunningTimeDiv = styled.div`
  margin-top: 7px;
  font-size: 0.625rem;
  font-weight: 700;
  line-height: 12px;
  text-align: end;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    text-align: start;
  }
`;

export const RatingWrapper = styled.div`
  direction: rtl;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    direction: ltr;
  }
`;

export const MovieDetailDiv = styled.div`
  color: var(--color-textgrey);
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.875rem;
  font-weight: 700;
`;

export const PlayerWrapper = styled.div`
  position: relative;
  width: 100%;
`;