import { useRef, useCallback } from 'react';

const useScroll = () => {
  const horizontalScrollRef = useRef<HTMLDivElement | null>(null);

  /**
   * 좌우 스크롤 버튼 클릭 리스너
   */
  const handleNextButtonClick = useCallback((nextType: 'prev' | 'next') => {
    if (!horizontalScrollRef.current) return;
    if (nextType === 'prev') {
      horizontalScrollRef.current.scrollBy({
        left: -Math.ceil(horizontalScrollRef.current.offsetWidth * 0.8),
        behavior: 'smooth',
      });
    } else {
      horizontalScrollRef.current.scrollBy({
        left: Math.ceil(horizontalScrollRef.current.offsetWidth * 0.8),
        behavior: 'smooth',
      });
    }
  }, []);

  return { horizontalScrollRef, handleNextButtonClick };
};

export default useScroll;
