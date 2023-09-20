import styled from '@emotion/styled';

export const Container = styled.div<{ visible: boolean }>`
  position: absolute;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  top: 0;
  right: 0;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background: #232323;
  transition: all 0.35s ease-out;
  transform: ${(props) =>
    props.visible ? 'translateX(0)' : 'translateX(100%)'};
`;

export const ReportTitleDiv = styled.div`
  display: flex;
  padding: 1rem 2rem;
  box-sizing: border-box;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  & div {
    color: #f00;
  }
`;

export const ContentDiv = styled.div<{ isEtc: boolean }>`
  display: flex;
  width: 100%;
  padding: 1rem 2rem;
  box-sizing: border-box;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: 700;
  background: ${(props) => (props.isEtc ? '#4A4A4A' : '#2d2d2d')};
`;

export const TitleDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.875rem;
`;

export const DescriptionDiv = styled.div`
  color: #a7a7a7;
  font-size: 0.5625rem;
`;
