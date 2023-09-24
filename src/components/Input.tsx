import styled from '@emotion/styled';

interface SizeProp {
  width?: string;
}

const Input = styled.input<SizeProp>`
  padding: 0 1.25rem;
  border: 2px solid #666;
  background: #4a4a4a;
  color: var(--color-font);
  ${(props) => (props.width ? `width:${props.width};` : 'flex-grow: 1;')}
  height: 2.3rem;
`;

export default Input;
