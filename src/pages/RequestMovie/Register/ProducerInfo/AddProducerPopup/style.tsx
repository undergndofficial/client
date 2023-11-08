import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  width: 43.75rem;
  height: 33rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  flex-shrink: 0;
  max-width: 80%;
  background-color: var(--color-background);
  border-radius: 1.875rem;
  > div {
    cursor: pointer;
  }
`;
