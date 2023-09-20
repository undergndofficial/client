import React, { useState } from 'react';
import { Container, Subtitle } from './style';

function SubtitleControl() {
  const subtitleList = [
    '끄기',
    '한국어',
    'English',
    '日本語',
    '中国語',
    'Français',
  ];
  const [curSubtitle, setCurSubtitle] = useState('끄기');

  return (
    <Container>
      {subtitleList.map((subtitle) => (
        <Subtitle
          key={subtitle}
          selected={curSubtitle === subtitle}
          onClick={(e) => {
            e.stopPropagation();
            setCurSubtitle(subtitle);
          }}
        >
          {subtitle}
        </Subtitle>
      ))}
    </Container>
  );
}

export default SubtitleControl;
