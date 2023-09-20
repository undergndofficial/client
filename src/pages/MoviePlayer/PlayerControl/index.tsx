import React, {
  MutableRefObject,
  useCallback,
  useState,
  useEffect,
} from 'react';
import {
  Container,
  CenterButton,
  TopWrapper,
  BottomWrapper,
  ControlButton,
  VolumeControl,
  TimeControl,
} from './style';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline, IoVolumeMediumSharp } from 'react-icons/io5';
import { IoMdPlay } from 'react-icons/io';
import {
  PiFlagPennantFill,
  PiArrowCounterClockwiseBold,
  PiArrowClockwiseBold,
} from 'react-icons/pi';
import { BsCardText, BsVolumeMuteFill } from 'react-icons/bs';
import { GiPauseButton } from 'react-icons/gi';
import { SiSpeedtest } from 'react-icons/si';
import { RiFullscreenLine } from 'react-icons/ri';
import theme from 'styles/theme';
import ReactPlayer from 'react-player';

type ControlsProps = {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playbackRate: number;
  setPlaybackRate: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  seeking: boolean;
  setSeeking: React.Dispatch<React.SetStateAction<boolean>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  wrapperRef: MutableRefObject<HTMLDivElement>;
  playerRef: MutableRefObject<ReactPlayer>;
  backwardVideo: (e: any) => void;
  forwardVideo: (e: any) => void;
};

export const Controls = ({
  playing,
  setPlaying,
  playbackRate,
  setPlaybackRate,
  duration,
  setDuration,
  seeking,
  setSeeking,
  volume,
  setVolume,
  fullScreen,
  setFullScreen,
  currentTime,
  wrapperRef,
  playerRef,
  backwardVideo,
  forwardVideo,
}: ControlsProps) => {
  const navigate = useNavigate();
  const [showVolume, setShowVolume] = useState(false);

  // 미디어 크기에 따라 아이콘 사이즈 다르게 제공
  const [iconSize, setIconSize] = useState(30);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (isMobile) setIconSize(18);
    else setIconSize(30);
  }, [isMobile]);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `${theme.device.phone}, ${theme.device.tablet}`,
    );
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (e: any) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  // 재생 시간 계산
  const [timeRate, setTimeRate] = useState(0);
  useEffect(() => {
    if (duration == 0) {
      setTimeRate(0);
      return;
    }
    setTimeRate((currentTime / duration) * 100);
  }, [currentTime]);

  // 전체 화면 버튼
  const openFullscreen = useCallback(
    (e: any) => {
      e.stopPropagation();
      if (!fullScreen && wrapperRef.current.requestFullscreen) {
        wrapperRef.current.requestFullscreen();
        setFullScreen(true);
      } else if (fullScreen && document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    },
    [wrapperRef, fullScreen],
  );

  // 볼륨 변경
  const volumeChange = useCallback((e: any) => {
    e.stopPropagation();
    const value = parseFloat(e.target.value);
    setVolume(value);
  }, []);

  return (
    <Container>
      {/* 상단 뒤로가기, 신고 버튼 */}
      <TopWrapper>
        <ControlButton
          onClick={() => {
            navigate('/');
          }}
        >
          <IoArrowBackOutline size={iconSize} />
        </ControlButton>
        <ControlButton>
          <PiFlagPennantFill size={iconSize} />
        </ControlButton>
      </TopWrapper>
      {/* 가운데 일시정지/재생 버튼 */}
      <CenterButton>
        {playing ? <GiPauseButton size="70" /> : <IoMdPlay size="70" />}
      </CenterButton>
      {/* 하단 버튼 */}
      <div>
        <TimeControl
          time={timeRate}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type={'range'}
            min={0}
            max={100}
            value={timeRate}
            onChange={(e) => {
              playerRef.current.seekTo(
                parseInt(e.target.value) / 100,
                'fraction',
              );
            }}
            onMouseDown={() => {
              setSeeking(true);
            }}
          />
        </TimeControl>
        <BottomWrapper>
          {/* 재생, 일시 정지, 뒤로 가기, 앞으로 가기, 볼륨 버튼 */}
          <div>
            <ControlButton onClick={() => setPlaying(!playing)}>
              {playing ? (
                <GiPauseButton size={iconSize} />
              ) : (
                <IoMdPlay size={iconSize} />
              )}
            </ControlButton>
            <ControlButton onClick={backwardVideo}>
              <PiArrowCounterClockwiseBold size={iconSize} />
            </ControlButton>
            <ControlButton onClick={forwardVideo}>
              <PiArrowClockwiseBold size={iconSize} />
            </ControlButton>
            <div
              onMouseEnter={() => {
                setShowVolume(true);
              }}
              onMouseLeave={() => {
                setShowVolume(false);
              }}
              onClick={(e: any) => {
                e.stopPropagation();
              }}
            >
              <ControlButton>
                {volume == 0 ? (
                  <BsVolumeMuteFill
                    size={iconSize}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setVolume(1);
                    }}
                  />
                ) : (
                  <IoVolumeMediumSharp
                    size={iconSize}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      setVolume(0);
                    }}
                  />
                )}
              </ControlButton>
              {showVolume && (
                <VolumeControl volume={volume}>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={volume}
                    onChange={volumeChange}
                  />
                </VolumeControl>
              )}
            </div>
          </div>
          {/* 배속, 자막, 전체화면 버튼 */}
          <div>
            <ControlButton>
              <SiSpeedtest size={iconSize} />
            </ControlButton>
            <ControlButton>
              <BsCardText size={iconSize} />
            </ControlButton>
            <ControlButton onClick={openFullscreen}>
              <RiFullscreenLine size={iconSize} />
            </ControlButton>
          </div>
        </BottomWrapper>
      </div>
    </Container>
  );
};
