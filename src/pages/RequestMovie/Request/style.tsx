import styled from '@emotion/styled';
import theme from 'styles/theme';
import Button from 'components/Button';

export const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
  width: 70%;
  @media ${theme.device.phone}, ${theme.device.tablet} {
    width: 100%;
  }
  @media ${theme.device.phone} {
    padding: 0;
  }
`;

export const TitleDiv = styled.div`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const RequestForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 100%;
`;

export const FormItemDiv = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const Label = styled.div`
  width: 5rem;
  font-size: 1.3rem;
  font-weight: 700;
  @media ${theme.device.tablet} {
    width: 100%;
  }
  @media ${theme.device.phone} {
    font-size: 1.1rem;
    width: 100%;
  }
`;

export const RequestButton = styled(Button)`
  align-self: end;
`;

export const DirectorListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  width: 100%;
  margin-left: 6.2rem;
  @media ${theme.device.phone}, ${theme.device.tablet} {
    margin-left: 0;
  }
`;

export const DirectorTagDiv = styled.div`
  display: flex;
  padding: 0.2rem 0.8rem;
  align-items: center;
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
