import styled from '@emotion/styled';

interface SizeProp {
  width?: string;
  height?: string;
}

export const CommonButton = styled.button<SizeProp>`
  display: flex;
  ${(props) => (props.width ? `width:${props.width};` : '')}
  ${(props) => (props.height ? `height:${props.height};` : '')}
  width: 6.5rem;
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

export const CommonInput = styled.input<SizeProp>`
  width: 100%;
  padding: 0 1.25rem;
  border: 2px solid #666;
  background: #4a4a4a;
  color: var(--color-font);
  ${(props) => (props.width ? `width:${props.width};` : '')}
  ${(props) => (props.height ? `height:${props.height};` : '')}
`;
