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
  right: 3rem;
  display: inline-flex;
  padding: 0.6rem 0.4rem;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 0.625rem;
  background: #2f2f2f;
  text-align: center;
`;

export const Subtitle = styled.div<{ selected: boolean }>`
  display: flex;
  height: 1.625rem;
  width: 3.875rem;
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
