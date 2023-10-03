import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 43.75rem;
  height: 33rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  max-width: 80%;
  background-color: var(--color-background);
  border-radius: 1.875rem;
  padding: 2rem;
  gap: 3.38rem;
`;

export const CloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 25px;
  font-size: 2rem;
  cursor: pointer;
`;

export const BackButton = styled.div`
  position: absolute;
  top: 20px;
  left: 25px;
  font-size: 2rem;
  cursor: pointer;
`;

export const LoginTitleDiv = styled.div`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 500;
  margin-top: 2rem;
`;

export const RememberIdDiv = styled.div`
  display: flex;
  height: 1.5rem;
  align-items: center;
  cursor: pointer;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 60%;
  @media ${theme.device.phone} {
    width: 80%;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #4a4a4a;
  & div {
    margin-right: -1.5rem;
  }
  & input {
    width: 100%;
    color: var(--color-font);
    padding: 0.5rem 2rem;
    font-size: 1.25rem;
    font-weight: 500;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #666;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export const LoginButton = styled.div`
  border-radius: 0.75rem;
  background: #fff;
  border: none;
  padding: 0.78rem 2.12rem;
  color: #000;
  font-size: 1.625rem;
  font-weight: 600;
  cursor: pointer;
`;

export const FindPasswordButton = styled.div`
  color: #9d9d9d;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
`;

export const JoinButton = styled.div`
  color: #9d9d9d;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  & span {
    color: #fff;
    font-weight: 600;
  }
`;
