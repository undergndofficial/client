import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 16px;
  }
  ::-webkit-scrollbar-track {
    background: #000;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  place-content: center;
  color: var(--color-font);
  width: 100%;
  padding-bottom: 5rem;
`;

export const FooterContainer = styled.div``;
