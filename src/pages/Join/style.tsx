import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  justify-content: center;
  align-items: center;
  padding: 0 1.5rem;
  align-items: center;
`;

export const TitleDiv = styled.div`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 45rem;
  max-width: 90%;
`;

export const FormItemDiv = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  flex-wrap: wrap;
`;

export const Label = styled.div`
  width: 8rem;
  font-size: 1.3rem;
  font-weight: 700;
  @media ${theme.device.phone} {
    font-size: 1.1rem;
    width: 100%;
  }
`;

export const FlexWrapper = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${(props) => (props.gap ? props.gap : 0.7)}rem;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
`;

export const AuthButton = styled.div`
  display: flex;
  padding: 0.4375rem 1.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  background: #666;
  color: #a7a7a7;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
`;

export const TermsButton = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.3125rem 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  background: #666;
  color: #fff;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 700;
`;
