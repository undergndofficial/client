import styled from '@emotion/styled';
import theme from 'styles/theme';
import Input from 'components/Input';

const MARGIN_LABEL = '10.5rem';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  justify-content: center;
  align-items: center;
  padding: 0 3rem;
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

export const JoinForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  width: 60%;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    width: 100%;
  }
`;

export const FormItemDiv = styled.div`
  display: flex;
  gap: 1.5rem;
  row-gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
`;

export const Label = styled.div<{ alignSelf?: string; required?: boolean }>`
  padding: 0.2rem 0;
  width: 9rem;
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  ${(props) => props.alignSelf && `align-self: ${props.alignSelf}`};
  @media ${theme.device.tablet} {
    width: 100%;
  }
  @media ${theme.device.phone} {
    font-size: 1.1rem;
    width: 100%;
  }
  ${(props) =>
    props.required &&
    "::after { content: '*'; color: #f00; font-weight: 500; }"}
`;

export const FlexWrapper = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${(props) => (props.gap ? props.gap : 0.7)}rem;
  align-items: center;
  flex-wrap: wrap;
  cursor: pointer;
`;

export const WarningMessageDiv = styled.div<{ correct?: boolean }>`
  margin-left: ${MARGIN_LABEL};
  /* bottom: -1.8rem;
  position: absolute; */
  font-size: 0.9rem;
  width: 100%;
  color: #f00;
  ${(props) => props.correct && 'color: #00FF38'};
  @media ${theme.device.tablet}, ${theme.device.phone} {
    margin-left: 0;
  }
`;

export const PreviewImageWrapper = styled.div`
  & img {
    width: 10rem;
    height: 10rem;
  }
  margin-left: ${MARGIN_LABEL};
  @media ${theme.device.tablet}, ${theme.device.phone} {
    margin-left: 0;
  }
`;

export const AuthForm = styled.div`
  margin-left: ${MARGIN_LABEL};
  display: flex;
  gap: 0;
  width: 100%;
  & input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  @media ${theme.device.tablet}, ${theme.device.phone} {
    margin-left: 0;
  }
`;

export const AuthButton = styled.div`
  display: flex;
  padding: 0.4375rem 1.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.625rem;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
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

export const FormTitle = styled.div<{ disabled?: boolean }>`
  width: 100%;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.875rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  gap: 1rem;
  align-items: center;
  ${(props) => props.disabled && 'color:#545457;'}
`;

export const Textarea = styled.textarea`
  padding: 1.25rem;
  border: 2px solid #666;
  background: #4a4a4a;
  color: var(--color-font);
  height: 7rem;
  border-radius: 0.625rem;
  flex-grow: 1;
  resize: none;
`;

export const PhoneInput = styled(Input)`
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  [type='number'] {
    -moz-appearance: textfield;
  }
`;

export const StepWrapper = styled.div`
  display: flex;
  gap: 4rem;
  flex-wrap: wrap;
`;

export const StepDiv = styled.div<{ selected?: boolean }>`
  font-weight: 700;
  border-radius: 50%;
  border: 2px solid ${(props) => (props.selected ? '#fff' : '#545457')};
  color: ${(props) => (props.selected ? '#fff' : '#545457')};
  width: 7rem;
  height: 7rem;
  padding: 1rem;
  display: flex;
  font-size: 1.25rem;
  align-items: center;
  justify-content: center;
  word-break: keep-all;
  text-align: center;
`;

export const AddIconDiv = styled.div`
  width: 1.875rem;
  height: 1.875rem;
  background-color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #b6b6b6;
  font-size: 1.5rem;
  font-weight: 800;
  padding-bottom: 0.2rem;
  box-sizing: border-box;
  cursor: pointer;
`;
