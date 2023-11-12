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
  ControlItemDiv,
} from './style';
import { useNavigate } from 'react-router-dom';
import { IoArrowBackOutline, IoVolumeMediumSharp } from 'react-icons/io5';
import { IoMdPlay } from 'react-icons/io';
import {
  PiArrowCounterClockwiseBold,
  PiArrowClockwiseBold,
} from 'react-icons/pi';
import { BsVolumeMuteFill } from 'react-icons/bs';
import { GiPauseButton } from 'react-icons/gi';
import { SiSpeedtest } from 'react-icons/si';
import { RiFullscreenLine } from 'react-icons/ri';
import ReactPlayer from 'react-player';
import PlaybackRateControl from './PlaybackRateControl';
import dayjs from 'dayjs';

type ControlsProps = {
  playing: boolean;
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  playbackRate: number;
  setPlaybackRate: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  fullScreen: boolean;
  setFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
  currentTime: number;
  wrapperRef: MutableRefObject<HTMLDivElement>;
  playerRef: MutableRefObject<ReactPlayer>;
  backwardVideo: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  forwardVideo: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isMobile: boolean;
};

export const Controls = ({
  playing, // 재생 여부
  setPlaying,
  playbackRate, // 배속
  setPlaybackRate,
  duration, // 전체 시간
  volume, // 볼륨
  setVolume,
  fullScreen, // 전체 화면 여부
  setFullScreen,
  currentTime, // 현재 진행 시간
  wrapperRef, // 플레이어 Wrapper 요소
  playerRef, // 플레이어 요소
  backwardVideo, // 뒤로 감기 함수
  forwardVideo, // 앞으로 감기 함수
  isMobile, // 모바일 화면인지 여부
}: ControlsProps) => {
  const navigate = useNavigate();

  // 음량, 속도 설정 컨트롤 보여줄 지 여부
  const [showVolume, setShowVolume] = useState(false);
  const [showSpeed, setShowSpeed] = useState(false);

  // 미디어 크기에 따라 아이콘 사이즈 다르게 제공
  const [iconSize, setIconSize] = useState(30);

  // 재생바 마우스 오버 여부
  const [hoverTimeControl, setHoverTimeControl] = useState(false);

  useEffect(() => {
    if (isMobile) setIconSize(21);
    else setIconSize(30);
  }, [isMobile]);

  // 재생 중인 시간 계산
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
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
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
  const volumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const value = parseFloat(e.target.value);
    setVolume(value);
  }, []);

  // 시간 정보 formatter
  const timeFormatter = useCallback((seconds: number) => {
    const duration = dayjs().startOf('day').add(seconds, 'second');
    let formattedTime = '';
    if (duration.hour() > 0) {
      formattedTime = duration.format('HH:mm:ss');
    } else {
      formattedTime = duration.format('mm:ss');
    }
    return formattedTime;
  }, []);

  return (
    <Container>
      {/* 상단 뒤로가기, 신고 버튼 */}
      <TopWrapper>
        <ControlButton
          onClick={() => {
            navigate(-1);
          }}
        >
          <IoArrowBackOutline size={iconSize} />
        </ControlButton>
      </TopWrapper>
      {/* 가운데 일시정지/재생 버튼 */}
      <CenterButton>
        {playing ? (
          <GiPauseButton size={iconSize * 2} />
        ) : (
          <IoMdPlay size={iconSize * 2} />
        )}
      </CenterButton>
      {/* 하단 버튼 */}
      <div>
        <TimeControl
          time={timeRate}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onMouseEnter={() => {
            setHoverTimeControl(true);
          }}
          onMouseLeave={() => {
            setHoverTimeControl(false);
          }}
          mouseOver={hoverTimeControl}
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
          />
          <div>
            {timeFormatter(currentTime)} / {timeFormatter(duration)}
          </div>
        </TimeControl>
        <BottomWrapper>
          {/* 재생, 일시 정지, 뒤로 가기, 앞으로 가기, 볼륨 버튼 */}
          <ControlItemDiv>
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
            <ControlItemDiv
              onMouseEnter={() => {
                setShowVolume(true);
              }}
              onMouseLeave={() => {
                setShowVolume(false);
              }}
              onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
                e.stopPropagation();
              }}
            >
              <ControlButton>
                {volume == 0 ? (
                  <BsVolumeMuteFill
                    size={iconSize}
                    onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
                      e.stopPropagation();
                      setVolume(1);
                    }}
                  />
                ) : (
                  <IoVolumeMediumSharp
                    size={iconSize}
                    onClick={(e: React.MouseEvent<SVGElement, MouseEvent>) => {
                      e.stopPropagation();
                      setVolume(0);
                    }}
                  />
                )}
              </ControlButton>
              <VolumeControl volume={volume} showVolume={showVolume}>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={volume}
                  onChange={volumeChange}
                />
              </VolumeControl>
            </ControlItemDiv>
          </ControlItemDiv>
          {/* 배속, 자막, 전체화면 버튼 */}
          <ControlItemDiv>
            <ControlButton
              onClick={(e) => {
                e.stopPropagation();
                setShowSpeed((prev) => !prev);
              }}
            >
              <SiSpeedtest size={iconSize} />
            </ControlButton>
            <ControlButton onClick={openFullscreen}>
              <RiFullscreenLine size={iconSize} />
            </ControlButton>
          </ControlItemDiv>
        </BottomWrapper>
      </div>
      {/* 배속, 자막 컨트롤 */}
      {showSpeed && (
        <PlaybackRateControl
          playbackRate={playbackRate}
          setPlaybackRate={setPlaybackRate}
        />
      )}
    </Container>
  );
};
