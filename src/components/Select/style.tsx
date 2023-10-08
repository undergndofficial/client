import styled from '@emotion/styled';

interface SizeProp {
  width?: string;
}

export const Container = styled.div<SizeProp>`
  ${(props) => (props.width ? `width:${props.width};` : 'flex-grow: 1;')}
`;
