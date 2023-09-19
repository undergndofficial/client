import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 5px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

export const CenterButton = styled.div`
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
  color: var(--color-textgrey);
`;

export const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 1rem;
`;

export const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  padding: 1rem;
  margin-bottom: -1rem;
  & div {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;

export const ControlButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: var(--color-textgrey);
`;

export const VolumeControl = styled.div<{ volume: number }>`
  input[type='range'] {
    -webkit-appearance: none;
    height: 100%;
    background: transparent;
    width: 5rem;
    margin-left: -0.7rem;
    @media ${theme.device.phone}, ${theme.device.tablet} {
      width: 3rem;
    }

    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      background: ${(props) => (props.volume ? 'white' : '#E5E7EB')};
      margin-top: -3px;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      height: 0.6rem;
      background: ${(props) =>
        props.volume
          ? `linear-gradient(to right, white ${
              props.volume * 100
            }%, rgba(229, 231, 235, 0.5)
 ${props.volume * 100}% 100%)`
          : '#E5E7EB'};
      opacity: ${(props) => (props.volume == 0 ? '0.5' : '1')};
      border-radius: 3rem;
      transition: all 0.3s;
      cursor: pointer;
    }
  }
`;

export const TimeControl = styled.div<{ time: number }>`
  padding: 0 1rem;
  box-sizing: border-box;
  input[type='range'] {
    -webkit-appearance: none;
    width: 100%;
    height: 100%;
    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 0.8rem;
      width: 0.8rem;
      border-radius: 50%;
      margin-top: -3px;
      background: white;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      height: 0.4rem;
      background: ${(props) =>
        props.time
          ? `linear-gradient(to right, white ${props.time}%, rgba(0, 0, 0, 0.4)
 ${props.time}% 100%)`
          : '#E5E7EB'};
      transition: all 0.5s;
      cursor: pointer;
    }
  }
`;
