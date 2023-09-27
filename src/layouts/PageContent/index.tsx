import React, { useCallback } from 'react';
import { Container } from './style';
import { IoArrowBack } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function PageContent({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const onClickBackButton = useCallback(() => {
    navigate(-1);
  }, []);
  return (
    <Container>
      <IoArrowBack
        size="30"
        style={{ cursor: 'pointer' }}
        onClick={onClickBackButton}
      />
      {children}
    </Container>
  );
}

export default PageContent;
