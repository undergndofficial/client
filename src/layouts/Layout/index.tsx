import React, { ReactNode, useState, useCallback, useRef } from 'react';
import Header from '../Header';
import Footer from 'layouts/Footer';
import { Container, Content } from './style';

/**
 * 레이아웃 컴포넌트
 */
function Layout({ children }: { children: ReactNode }) {
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

  return (
    <Container onScroll={onScrollContent} ref={contentRef}>
      <Header scrollTop={isScrollTop} />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
}

export default Layout;
