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
  IconWrapper,
  RunningTimeDiv,
  RatingWrapper,
  PlayerWrapper,
} from './style';
import ReactPlayer from 'react-player';
import { FaHeart } from 'react-icons/fa';
import { PiFlagPennantFill } from 'react-icons/pi';
import Rating from 'react-star-ratings';
import { Controls } from './PlayerControl';

function MoviePlayer() {
  const [playing, setPlaying] = useState(false); // 재생중
  const [volume, setVolume] = useState(0.5); // 볼륨 크기
  const [playbackRate, setPlaybackRate] = useState(1); // 배속
  const [seeking, setSeeking] = useState(false); // 재생바 탐색
  const [duration, setDuration] = useState(0); // 전체 시간
  const [controlHide, setControlHide] = useState(true); // 컨트롤 노출 여부
  const [fullScreen, setFullScreen] = useState(false); // 전체 화면 여부
  const playerRef = useRef() as MutableRefObject<ReactPlayer>;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  let timer: NodeJS.Timeout | null = null;

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
    (e: any) => {
      e.stopPropagation();
      const time = playerRef.current.getCurrentTime() - 5;
      playerRef.current.seekTo(time);
    },
    [playerRef],
  );

  // 앞으로 감기
  const forwardVideo = useCallback(
    (e: any) => {
      e.stopPropagation();
      const time = playerRef.current.getCurrentTime() + 5;
      playerRef.current.seekTo(time);
    },
    [playerRef, duration],
  );

  // 키보드로 조작할 수 있도록 키 다운 이벤트 리스너 설정
  useEffect(() => {
    const keyEvent = (e: any) => {
      console.log(e);
      if (e.keyCode === 32) setPlaying(!playing);
      else if (e.keyCode === 38)
        setVolume(volume + 0.05 >= 1 ? 1 : volume + 0.05);
      else if (e.keyCode === 40)
        setVolume(volume - 0.05 <= 0 ? 0 : volume - 0.05);
      else if (e.keyCode === 37) backwardVideo(e);
      else if (e.keyCode === 39) forwardVideo(e);
      else return;
      e.preventDefault();
      setControlHide(false);
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        setControlHide(true);
      }, 5000);
    };

    const changeFullScreen = () => {
      setFullScreen(document.fullscreenElement !== null);
    };

    window.addEventListener('keydown', keyEvent);
    document.addEventListener('fullscreenchange', changeFullScreen);

    return () => {
      window.removeEventListener('keydown', keyEvent);
      document.removeEventListener('fullscreenchange', changeFullScreen);
    };
  }, [playing, volume, fullScreen]);

  return (
    <Container>
      <PlayerWrapper
        onMouseMove={mouseMoveHandle}
        onMouseLeave={() => {
          setControlHide(true);
        }}
        onClick={() => setPlaying(!playing)}
        ref={wrapperRef}
      >
        <ReactPlayer
          ref={playerRef}
          url="/assets/tmp-movie.mp4"
          width="100%"
          height={fullScreen ? '100vh' : '85vh'}
          playing={playing}
          volume={volume}
          playbackRate={playbackRate}
          duration={duration}
          onPause={() => {
            setControlHide(false);
          }}
          loop={false}
        />
        {!controlHide && (
          <Controls
            wrapperRef={wrapperRef}
            playing={playing}
            volume={volume}
            setVolume={setVolume}
            playbackRate={playbackRate}
            setPlaybackRate={setPlaybackRate}
            duration={duration}
            setDuration={setDuration}
            seeking={seeking}
            setSeeking={setSeeking}
            setPlaying={setPlaying}
            fullScreen={fullScreen}
            setFullScreen={setFullScreen}
            backwardVideo={backwardVideo}
            forwardVideo={forwardVideo}
          />
        )}
      </PlayerWrapper>

      <MovieInfo>
        <TitleDiv>
          <div>
            파수꾼{' '}
            <img
              src={`${process.env.PUBLIC_URL}assets/baytree.svg`}
              alt="icon"
            />
          </div>
          <IconWrapper>
            <FaHeart size="23" />
            <PiFlagPennantFill size="25" />
          </IconWrapper>
        </TitleDiv>
        <DescriptionDiv>
          <div className="description">
            한 소년이 죽었다. 평소 아들에게 무심했던 소년의 아버지(조성하)는
            아들의 갑작스런 공백에 매우 혼란스러워하며 뒤늦은 죄책감과 무력함에,
            아들 기태(이제훈)의 죽음을 뒤쫓기 시작한다. 아들의 책상 서랍 안,
            소중하게 보관되어 있던 사진 속에는 동윤(서준영)과 희준(박정민)이
            있다. 하지만 학교를 찾아가 겨우 알아낸 사실은 한 아이는 전학을 갔고
            한 아이는 장례식장에 오지도 않았다는 것. 뭔가 이상하다. 그러던 중,
            간신히 찾아낸 희준은 ‘기태와 제일 친했던 것은 동윤’이라고 말하며
            자세한 대답을 회피한다. 결국 아버지의 부탁으로 동윤을 찾아나선 희준.
            하지만, 학교를 자퇴하고 떠나버린 친구는 어디에도 없다. 천진하고
            순수했던 그 시절, 미성숙한 소통의 오해가 불러 일으킨 비극적 파국.
            독단적 우정이 가져온 폭력과 그 상처의 전염은 우리를 아프고 충격적인
            결말로 이끌어간다. 서로가 전부였던 이 세 친구들 사이에서 과연 무슨
            일이 벌어진 걸까?
          </div>
          <div>
            <RatingWrapper>
              <Rating
                rating={4.5}
                starEmptyColor="transparent"
                starRatedColor="#bdff00"
                starDimension="1.5rem"
                starSpacing="2px"
              />
            </RatingWrapper>
            <RunningTimeDiv>
              총 1시간 56분
              <br />
              조회수 8만 회
            </RunningTimeDiv>
          </div>
        </DescriptionDiv>
        <MovieDetailDiv>
          <div>개봉일 : 2011.03.03</div>
          <div>감독 : 윤성현</div>
          <div>각본 : 윤성현</div>
          <div>출연진 : 이제훈, 서준영, 박정민, 조성하</div>
        </MovieDetailDiv>
      </MovieInfo>
    </Container>
  );
}

export default MoviePlayer;
