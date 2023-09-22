import React, { ReactNode, useState, useCallback, useRef } from 'react';
import Header from '../Header';
import Footer from 'layouts/Footer';
import { Container, Content } from './style';

/**
 * 레이아웃 컴포넌트
 */
function Layout({
  showFooter = true,
  children,
}: {
  showFooter?: boolean; //footer 보여줄지 여부 . 기본값은 true고 안보여주고 싶으면 false로 전달
  children: ReactNode;
}) {
  // 스크롤이 맨 위에 있지 않은 경우 감지
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [isScrollTop, setIsScrollTop] = useState(true);
  const onScrollContent = useCallback(() => {
    const scrollTop = contentRef.current?.scrollTop;
    if (scrollTop != 0) {
      setIsScrollTop(false);
    } else {
      setIsScrollTop(true);
    }
  }, []);

  // 검색 팝업 열고 닫기 (여는건 헤더에서 여는데 닫는건 밖에서 닫아야 해서 ... )
  const [showSearchPopup, setShowSearchPopup] = useState(false);
  const closeSearchPopup = useCallback(() => {
    setShowSearchPopup(false);
  }, []);

  return (
    <Container
      onScroll={onScrollContent}
      ref={contentRef}
      onClick={closeSearchPopup}
    >
      <Header
        scrollTop={isScrollTop}
        showSearchPopup={showSearchPopup}
        setShowSearchPopup={setShowSearchPopup}
      />
      <Content>{children}</Content>
      {showFooter && <Footer />}
    </Container>
  );
}

export default Layout;
