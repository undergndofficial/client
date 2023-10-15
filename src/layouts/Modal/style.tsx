import styled from '@emotion/styled';

export const CreateModal = styled.div<{ backgroundFilter: boolean }>`
  position: fixed;
  text-align: center;
  left: 0;
  bottom: 0;
  top: 0;
  right: 0;
  z-index: 998;
  ${(props) => props.backgroundFilter && 'z-index: 999'};
  ${(props) =>
    props.backgroundFilter && 'background-color: rgba(0, 0, 0, 0.6)'};
`;
