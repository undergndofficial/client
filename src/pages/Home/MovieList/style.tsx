import styled from '@emotion/styled';

interface VisibleProp {
  visible: boolean;
}

export const MovieContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 3.5rem;
  width: 100%;
  overflow-x: auto;
  padding: 0 1rem 0 5rem;
  box-sizing: border-box;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const TagDiv = styled.div<VisibleProp>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  width: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.25rem;
  font-weight: 600;
`;

export const MovieListWrapper = styled.div`
  display: flex;
  padding-right: 0px;
  align-items: flex-start;
  gap: 1rem;
  flex: 1 0 0;
  align-self: stretch;
`;

export const MoviePosterDiv = styled.div<{ url: string }>`
  width: 18.125rem;
  height: 10.1875rem;
  border-radius: 1.25rem;
  background-image: url(${(props) => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 4rem;
  margin-bottom: 10px;
  position: relative;
  justify-content: space-between;
`;

export const TitleDiv = styled.div<VisibleProp>`
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.24rem;
  margin-right: 0;
`;

export const ScrollButton = styled.div<{
  visible: boolean;
  nextType: 'prev' | 'next';
}>`
  opacity: ${(props) => (props.visible ? 1 : 0.8)};
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: ${(props) =>
    props.visible
      ? ''
      : `translateX(${props.nextType == 'prev' ? 3.74 : -3.74}rem) rotate(${
          props.nextType == 'prev' ? 180 : -180
        }deg)`};
  transition: all 0.35s ease-out;
`;

export const MovieWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MovieInfoDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: space-between;
  font-size: 0.625rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  & span {
    font-size: 0.75rem;
    margin-right: 0.75rem;
  }
`;

export const MovieTitleDiv = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 700;
`;
