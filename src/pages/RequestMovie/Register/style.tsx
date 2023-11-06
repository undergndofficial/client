import styled from '@emotion/styled';
import theme from 'styles/theme';

const MARGIN_LABEL = '12rem';

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

export const Form = styled.form`
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
  flex-wrap: wrap;
  position: relative;
`;

export const Label = styled.div<{ alignSelf?: string; required?: boolean }>`
  padding: 0.2rem 0;
  width: 10.5rem;
  font-size: 1.3rem;
  font-weight: 700;
  display: flex;
  /* align-items: center; */
  gap: 0.5rem;
  ${(props) => props.alignSelf && `align-self: ${props.alignSelf}`};
  ${(props) =>
    props.required &&
    "::after { content: '*'; color: #f00; font-weight: 500; }"}
  @media ${theme.device.tablet} {
    width: 100%;
  }
  @media ${theme.device.phone} {
    font-size: 1.1rem;
    width: 100%;
  }
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

export const FormTitle = styled.div`
  width: 100%;
  padding: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.875rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: center;
  font-size: 1.25rem;
  font-weight: 700;
`;

export const CheckboxWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  row-gap: 1rem;
  column-gap: 2rem;
  width: 70%;
  @media ${theme.device.tablet}, ${theme.device.phone} {
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

export const TagListDiv = styled.div`
  margin-left: ${MARGIN_LABEL};
  width: 100%;
  @media ${theme.device.phone}, ${theme.device.tablet} {
    margin-left: 0;
  }
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

export const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

export const StepWrapper = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const StepDiv = styled.div<{ selected?: boolean }>`
  font-weight: ${(props) => (props.selected ? '700' : '500')};
  border-radius: 50%;
  border: ${(props) => (props.selected ? '5px' : '1px')} solid #fff;
  width: 5rem;
  height: 5rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  word-break: keep-all;
`;
