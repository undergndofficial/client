import styled from '@emotion/styled';

export const Container = styled.div<{ scrollTop: boolean }>`
  color: var(--color-font);
  padding: 0.5rem 3rem;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  box-sizing: border-box;
  z-index: 999;
  background-image: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.7) 10%,
    transparent
  );
  transition: background-color 0.4s;
  ${(props) =>
    props.scrollTop ? '' : 'background-color: var(--color-background)'};
`;

export const Logo = styled.img`
  cursor: pointer;
  width: 70px;
`;

export const Toolbar = styled.div`
  display: flex;
  display: flex;
  align-items: center;
  gap: 4rem;
  cursor: pointer;
`;
