import styled from '@emotion/styled';

export const Container = styled.div`
  @keyframes fadeInUp {
    0% {
      opacity: 0;
      transform: translate3d(0, 50%, 0);
    }
    to {
      opacity: 1;
      transform: translateZ(0);
    }
  }
  animation: fadeInUp 0.3s;
  position: absolute;
  bottom: 3rem;
  right: 6rem;
  display: inline-flex;
  padding: 0.6rem 0.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #2f2f2f;
  transition: all 0.35s ease-out;
`;

export const Speed = styled.div<{ selected: boolean }>`
  display: flex;
  width: 3.875rem;
  height: 1.625rem;
  padding: 0.25rem 0.625rem;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1rem;
  color: #a7a7a7;
  text-align: center;
  font-weight: 500;
  ${(props) =>
    props.selected && 'background-color:#161616; color:var(--color-font);'}
`;
