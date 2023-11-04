import React from 'react';
import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import { Container, StepWrapper, StepDiv } from './style';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

function Register() {
  const steps = [
    { order: 1, label: '작품 정보', router: '' },
    { order: 2, label: '영상 정보', router: 'video' },
    { order: 3, label: '제작자 정보', router: 'producer' },
    { order: 4, label: '작품 상영/수상 경력', router: 'career' },
    { order: 5, label: '문의/요청', router: 'inquiry' },
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const curUrl = location.pathname.slice(1).split('/')[2];
  const curStepIdx = steps.findIndex((item) => item.router === curUrl);
  const props = {
    prevUrl: curStepIdx > 0 ? steps[curStepIdx - 1].router : null,
    nextUrl:
      curStepIdx < steps.length - 1 ? steps[curStepIdx + 1].router : null,
  };

  return (
    <Layout>
      <PageContent>
        <Container>
          <StepWrapper>
            {steps.map((step) => (
              <StepDiv
                key={step.order}
                selected={step.router === curUrl}
                onClick={() => {
                  navigate(`/request-movie/register/${step.router}`);
                }}
              >
                {step.label}
              </StepDiv>
            ))}
          </StepWrapper>
          <Outlet context={{ props }} />
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Register;
