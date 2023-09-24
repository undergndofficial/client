import styled from '@emotion/styled';

interface SizeProp {
  width?: string;
  height?: string;
}

const Button = styled.button<SizeProp>`
  display: flex;
  ${(props) => (props.width ? `width:${props.width};` : '')}
  ${(props) => (props.height ? `height:${props.height};` : '')}
  padding: 0.4375rem 1.25rem;
  justify-content: center;
  align-items: center;
  gap: 0.625rem;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #fff;
  border: none;
  text-align: center;
  font-size: 1.125rem;
  font-weight: 600;
  cursor: pointer;
`;

export default Button;
