import styled from '@emotion/styled';
import theme from 'styles/theme';
import Button from 'components/Button';

const MARGIN_LABEL = '9.5rem';

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

export const WriteForm = styled.form`
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

export const Label = styled.div<{ alignSelf?: string }>`
  padding: 0.2rem 0;
  width: 8rem;
  font-size: 1.3rem;
  font-weight: 700;
  ${(props) => props.alignSelf && `align-self: ${props.alignSelf}`};
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
  width: 100%;
  color: #f00;
  ${(props) => props.correct && 'color: #00FF38'};
  @media ${theme.device.tablet}, ${theme.device.phone} {
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

export const WriteButton = styled(Button)`
  border-radius: 1.25rem;
`;

export const SelectWrapper = styled.div`
  width: 30%;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    width: 100%;
  }
`;
