import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding-bottom: 0.8rem;
`;

export const CenterButton = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0) 100%
  );
  align-items: center;
`;

export const ControlItemDiv = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  @media ${theme.device.phone} {
    gap: 0.2rem;
  }
`;

export const ControlButton = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  color: var(--color-textgrey);
  display: flex;
`;

export const VolumeControl = styled.div<{
  volume: number;
  showVolume: boolean;
}>`
  input[type='range'] {
    -webkit-appearance: none;
    height: 100%;
    background: transparent;
    width: ${(props) => (props.showVolume ? '5rem' : '0rem')};
    transition: all 0.3s;
    @media ${theme.device.phone}, ${theme.device.tablet} {
      width: ${(props) => (props.showVolume ? '3rem' : '0rem')};
    }

    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      display: ${(props) => (props.showVolume ? 'block' : 'none')};
      -webkit-appearance: none;
      height: 1rem;
      width: 1rem;
      border-radius: 50%;
      background: ${(props) => (props.volume ? 'white' : '#E5E7EB')};
      margin-top: -4px;
      margin-left: -0.4px;
      cursor: pointer;
    }

    &::-webkit-slider-runnable-track {
      height: 0.5rem;
      background: ${(props) =>
        props.volume
          ? `linear-gradient(to right, white ${
              props.volume * 100
            }%, rgb(163, 163, 163)
 ${props.volume * 100}% 100%)`
          : 'var(--color-textgrey)'};
      border-radius: 3rem;
      transition: all 0.3s;
      cursor: pointer;
    }
  }
`;

export const TimeControl = styled.div<{ time: number; mouseOver: boolean }>`
  position: absolute;
  bottom: 3.5rem;
  width: 100%;
  padding: 0 1rem;
  box-sizing: border-box;
  display: flex;
  gap: 1rem;
  & div {
    font-size: 0.8rem;
    text-align: center;
    color: ${(props) =>
      props.mouseOver ? 'var(--color-font)' : 'var(--color-textgrey)'};
  }
  input[type='range'] {
    -webkit-appearance: none;
    background-color: transparent;
    flex-grow: 1;
    &:focus {
      outline: none;
    }

    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      height: 1.2rem;
      width: 1.2rem;
      border-radius: 50%;
      margin-top: -5px;
      background: white;
      cursor: pointer;
      opacity: ${(props) => (props.mouseOver ? '1' : '0')};
    }

    &::-webkit-slider-runnable-track {
      height: ${(props) => (props.mouseOver ? '0.6rem' : '0.4rem')};
      border-radius: 1rem;
      background: ${(props) =>
        props.time
          ? `linear-gradient(to right, ${
              props.mouseOver ? 'white' : 'var(--color-textgrey)'
            } ${props.time}%, ${
              props.mouseOver ? 'rgb(163, 163, 163)' : 'rgb(93, 93, 93)'
            }
 ${props.time}% 100%)`
          : 'var(--color-textgrey)'};
      cursor: pointer;
      transition: all 0.3s;
    }
  }
`;
