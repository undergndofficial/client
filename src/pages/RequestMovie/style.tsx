import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  justify-content: center;
  align-items: center;
`;

export const TitleDiv = styled.div`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  @media ${theme.device.phone} {
    flex-wrap: wrap;
  }
`;

export const RequestButton = styled.div`
  display: flex;
  width: 50%;
  padding: 2.85569rem 1.25rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.89238rem;
  border-radius: 3.56963rem;
  border: 2.856px solid #4a4a4a;
  cursor: pointer;
  @media ${theme.device.phone} {
    width: 100%;
  }
`;

export const DescriptionDiv = styled.div`
  align-self: stretch;
  color: #a7a7a7;
  text-align: center;
  font-weight: 400;
`;

export const ButtonTitleDiv = styled.div`
  color: #fff;
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
`;

export const ButtonIconDiv = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  width: 14.2785rem;
  height: 14.2785rem;
`;
