import React, { useState } from 'react';
import { Container, Subtitle } from './style';
import { useTranslation } from 'react-i18next';

function SubtitleControl() {
  const { t } = useTranslation();
  const subtitleList = [
    t('off'),
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
