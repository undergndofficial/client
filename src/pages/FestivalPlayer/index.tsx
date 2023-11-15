import React, {
  useState,
  useRef,
  MutableRefObject,
  useCallback,
  useEffect,
} from 'react';
import {
  Container,
  MovieInfo,
  TitleDiv,
  DescriptionDiv,
  MovieDetailDiv,
  RunningTimeDiv,
  PlayerWrapper,
  // ThumbnailImage,
} from './style';
import ReactPlayer from 'react-player';
import { Controls } from './PlayerControl';
import theme from 'styles/theme';
import { useTranslation } from 'react-i18next';
import useRequest from 'hooks/useRequest';
import { IFestivalMovieDetail } from 'types/festival';
import { getFestivalMovieDetail, getFestivalMovieUrl } from 'api/festival';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

function FestivalPlayer() {
  const { t } = useTranslation();

  const [playing, setPlaying] = useState(false); // 재생중
  const [volume, setVolume] = useState(0.5); // 볼륨 크기
  const [playbackRate, setPlaybackRate] = useState(1); // 배속
  const [duration, setDuration] = useState(0); // 전체 시간
  const [controlHide, setControlHide] = useState(true); // 컨트롤 노출 여부
  const [fullScreen, setFullScreen] = useState(false); // 전체 화면 여부
  const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
  const [isMobile, setIsMobile] = useState(false); // 모바일 화면인지 여부
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const { id } = useParams();

  const [movieInfo, setMovieInfo] = useState<IFestivalMovieDetail | null>(null);
  const [movieUrl, setMovieUrl] = useState('');
  const festId = 'CSUMB';
  const requestMovieInfo = useRequest<IFestivalMovieDetail[]>(
    getFestivalMovieDetail,
  );
  useEffect(() => {
    if (!id) return;
    requestMovieInfo({ festId, movSeq: id })
      .then((data) => {
        if (!isEmpty(data)) {
          setMovieInfo(data[0]);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const loadUrl = useCallback(() => {
    if (!id) return;
    getFestivalMovieUrl({ movSeq: parseInt(id), festId })
      .then((res) => {
        const { data } = res;
        if (data.st) {
          setMovieUrl(data.url);
        } else {
          toast.error(t('message.message64'));
        }
      })
      .catch(() => {
        toast.error(t('message.message64'));
      });
  }, []);

  useEffect(() => {
    if (!playing) return;
    if (movieUrl) return;
    loadUrl();
  }, [playing]);

  let timer: NodeJS.Timeout | null = null;

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      `${theme.device.phone}, ${theme.device.tablet}`,
    );
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
    };
  }, []);

  // 비디오 진행에 따라 호출되는 핸들러
  const handleProgress = useCallback(() => {
    setCurrentTime(playerRef.current.getCurrentTime());
  }, []);

  // 5초간 마우스 움직임이 없으면 컨트롤 가리기
  const mouseMoveHandle = useCallback(() => {
    setControlHide(false);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      setControlHide(true);
    }, 5000);
  }, [fullScreen]);

  // 뒤로 감기
  const backwardVideo = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (e) e.stopPropagation();
      const time = playerRef.current.getCurrentTime() - 5;
      playerRef.current.seekTo(time);
    },
    [playerRef],
  );

  // 앞으로 감기
  const forwardVideo = useCallback(
    (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      if (e) e.stopPropagation();
      const time = playerRef.current.getCurrentTime() + 5;
      playerRef.current.seekTo(time);
    },
    [playerRef, duration],
  );

  useEffect(() => {
    // 키보드로 조작할 수 있도록 키 다운 이벤트 리스너 설정
    // 키보드로 조작할 수 있도록 키 다운 이벤트 리스너 설정
    const keyEvent = (e: KeyboardEvent) => {
      if (e.key === ' ') setPlaying((prev) => !prev);
      else if (e.key === 'ArrowUp')
        setVolume(volume + 0.05 >= 1 ? 1 : volume + 0.05);
      else if (e.key === 'ArrowDown')
        setVolume(volume - 0.05 <= 0 ? 0 : volume - 0.05);
      else if (e.key === 'ArrowLeft') backwardVideo();
      else if (e.key === 'ArrowRight') forwardVideo();
      else return;
      e.preventDefault();
      setControlHide(false);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setControlHide(true);
      }, 5000);
    };

    // 전체 화면 변경 핸들러
    const changeFullScreen = () => {
      setFullScreen(document.fullscreenElement !== null);
    };

    window.addEventListener('keydown', keyEvent);
    document.addEventListener('fullscreenchange', changeFullScreen);

    // 비디오 전체 시간 설정
    if (playerRef.current) {
      setDuration(playerRef.current.getDuration() || 0);
    }

    return () => {
      window.removeEventListener('keydown', keyEvent);
      document.removeEventListener('fullscreenchange', changeFullScreen);
    };
  }, [playing, volume, fullScreen]);

  const getRunningTime = useCallback((times: number) => {
    if (times < 60) {
      return `${t('total')} ${times}${t('second')}`;
    }
    const hour = Math.floor(times / (60 * 60));
    const minute = Math.floor(hour / 60);
    const second = times % 60;
    return `${t('total')} ${hour !== 0 ? `${hour}${t('hour')}` : ''} ${
      minute !== 0 ? `${minute}${t('minute')}` : ''
    } ${second !== 0 ? `${second}${t('second')}` : ''}`;
  }, []);

  if (!movieInfo) {
    return <Container />;
  }
  return (
    <Container>
      <PlayerWrapper
        onMouseMove={mouseMoveHandle}
        onMouseLeave={() => {
          setControlHide(true);
        }}
        onClick={() => setPlaying((prev) => !prev)}
        ref={wrapperRef}
      >
        {/* {!playing && (
          <ThumbnailImage
            src={
              'https://storage.googleapis.com/movie_additional/cover/101.png'
            }
            alt="thumbnail"
            height={isMobile || fullScreen ? '100%' : '77vh'}
          />
        )} */}
        <ReactPlayer
          ref={playerRef}
          url={movieUrl}
          width="100%"
          height={isMobile || fullScreen ? '100%' : '77vh'}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          duration={duration}
          onPause={() => {
            setControlHide(false);
          }}
          loop={false}
          onProgress={handleProgress}
        />

        {!controlHide && (
          <Controls
            playerRef={playerRef}
            wrapperRef={wrapperRef}
            playing={playing}
            volume={volume}
            setVolume={setVolume}
            playbackRate={playbackRate}
            setPlaybackRate={setPlaybackRate}
            duration={duration}
            setPlaying={setPlaying}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            backwardVideo={backwardVideo}
            forwardVideo={forwardVideo}
            currentTime={currentTime}
            isMobile={isMobile}
          />
        )}
      </PlayerWrapper>

      <MovieInfo>
        <TitleDiv>
          <div>{movieInfo.movTitleEn}</div>
        </TitleDiv>
        <DescriptionDiv>
          <div className="description">{movieInfo.movPlot}</div>
          <div>
            <RunningTimeDiv>
              {getRunningTime(movieInfo.runningTime)}
              <br />
              {t('views')} {movieInfo.hitCount} {t('count')}
            </RunningTimeDiv>
          </div>
        </DescriptionDiv>
        <MovieDetailDiv>
          <div>
            {t('director')}: {movieInfo.director}
          </div>
        </MovieDetailDiv>
      </MovieInfo>
    </Container>
  );
}

export default FestivalPlayer;
