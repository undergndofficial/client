import { useState, useRef, useCallback } from 'react';

const useScroll = () => {
  const [leftArrowHovering, setLeftArrowHovering] = useState(false);
  const [rightArrowHovering, setRightArrowHovering] = useState(false);
  const horizontalScrollRef = useRef<HTMLDivElement | null>(null);

  const setArrowHovering = useCallback(
    (nextType: string, value: boolean | ((prevState: boolean) => boolean)) => {
      if (nextType === 'prev') setLeftArrowHovering(value);
      else setRightArrowHovering(value);
    },
    [],
  );

  /**
   * 스트릭 좌우 스크롤 버튼 클릭 리스너
   */
  const handleNextButtonClick = useCallback((nextType: string) => {
    if (!horizontalScrollRef.current) return;
    if (nextType === 'prev') {
      horizontalScrollRef.current.scrollTo({
        left:
          horizontalScrollRef.current.scrollLeft -
          horizontalScrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    } else {
      horizontalScrollRef.current.scrollTo({
        left:
          horizontalScrollRef.current.scrollLeft +
          horizontalScrollRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  }, []);

  return [
    leftArrowHovering,
    rightArrowHovering,
    setArrowHovering,
    horizontalScrollRef,
    handleNextButtonClick,
  ];
};

export default useScroll;
