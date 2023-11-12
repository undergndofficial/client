import React from 'react';
import { Container, Speed } from './style';

type PlaybackRateControlProps = {
  playbackRate: number;
  setPlaybackRate: React.Dispatch<React.SetStateAction<number>>;
};

function PlaybackRateControl({
  playbackRate,
  setPlaybackRate,
}: PlaybackRateControlProps) {
  const speedList = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 2];

  return (
    <Container>
      {speedList.map((speed) => (
        <Speed
          key={speed}
          selected={playbackRate === speed}
          onClick={(e) => {
            e.stopPropagation();
            setPlaybackRate(speed);
          }}
        >
          &times; {speed}
        </Speed>
      ))}
    </Container>
  );
}

export default PlaybackRateControl;
