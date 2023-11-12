import React, { ReactNode, useState, useCallback, useRef } from 'react';
import { Container, Content, HeaderContainer, Logo } from './style';
import { useNavigate } from 'react-router-dom';

/**
 * 영화제 레이아웃 컴포넌트
 */
function FestivalLayout({ children }: { children: ReactNode }) {
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
  const navigate = useNavigate();

  return (
    <Container onScroll={onScrollContent} ref={contentRef}>
      <HeaderContainer scrollTop={isScrollTop}>
        <Logo
          src={`${process.env.PUBLIC_URL}/assets/icon/logo-icon.svg`}
          alt="logo"
          onClick={() => navigate('/')}
        />
      </HeaderContainer>
      <Content>{children}</Content>
    </Container>
  );
}

export default FestivalLayout;
