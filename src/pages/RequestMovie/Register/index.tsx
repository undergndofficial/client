import React, { useState } from 'react';
import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import {
  Container,
  FormTitle,
  ButtonWrapper,
  StepWrapper,
  StepDiv,
} from './style';
import MovieInfo from './MovieInfo';
import CareerInfo from './CareerInfo';
import ProducerInfo from './ProducerInfo';
import VideoInfo from './VideoInfo';
import Button from 'components/Button';
import InquiryInfo from './InquiryInfo';

function Register() {
  const steps = [
    { order: 1, label: '작품 정보', component: <MovieInfo /> },
    { order: 2, label: '영상 정보', component: <VideoInfo /> },
    { order: 3, label: '제작자 정보', component: <ProducerInfo /> },
    { order: 4, label: '작품 상영/수상 경력', component: <CareerInfo /> },
    { order: 5, label: '문의/요청', component: <InquiryInfo /> },
  ];
  const [curStep, setCurStep] = useState(steps[0]);

  return (
    <Layout>
      <PageContent>
        <Container>
          <StepWrapper>
            {steps.map((step) => (
              <StepDiv
                key={step.order}
                selected={step.order === curStep.order}
                onClick={() => {
                  setCurStep(step);
                }}
              >
                {step.label}
              </StepDiv>
            ))}
          </StepWrapper>
          <FormTitle>{curStep.label}</FormTitle>
          {curStep.component}
          <ButtonWrapper>
            {curStep.order > 1 && (
              <Button
                onClick={() => {
                  const prevIdx = curStep.order - 2;
                  setCurStep(steps[prevIdx]);
                }}
              >
                이전
              </Button>
            )}
            {curStep.order < steps.length && (
              <Button
                onClick={() => {
                  const nextIdx = curStep.order;
                  setCurStep(steps[nextIdx]);
                }}
              >
                다음
              </Button>
            )}
            {curStep.order === steps.length && <Button>등록 신청</Button>}
          </ButtonWrapper>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Register;
