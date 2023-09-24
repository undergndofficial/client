import styled from '@emotion/styled';

export const Container = styled.div`
  width: 37.5rem;
  max-width: 90%;
  border-radius: 1.875rem;
  border: 1px solid #4a4a4a;
`;

export const TitleDiv = styled.div`
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  padding: 1rem 0;
  border-bottom: 1px solid #4a4a4a;
`;

export const ContentDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 3rem 0;
`;

export const FindIconWrapper = styled.div`
  display: flex;
  width: 8.75rem;
  height: 8.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 1.875rem;
  background: #1c1c1c;
  font-size: 3.5rem;
  cursor: pointer;
`;

export const FindWayDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  & span {
    color: #fff;
    text-align: center;
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

export const BottomInfoWrapper = styled.div`
  position: absolute;
  bottom: 2rem;
  display: flex;
  & div {
    cursor: pointer;
    padding: 0 2rem;
    color: #acacac;
    text-align: center;
    font-size: 0.875rem;
    font-weight: 600;
    border-right: 1px solid #acacac;
    :last-child {
      color: var(--color-font);
      border-right: none;
    }
  }
`;
