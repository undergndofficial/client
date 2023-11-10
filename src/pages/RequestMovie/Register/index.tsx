import React, { useCallback, useEffect, useState } from 'react';
import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import { Container, StepWrapper, StepDiv, TitleDiv } from './style';
import VideoInfo from './VideoInfo';
import ProducerInfo from './ProducerInfo';
import CareerInfo from './CareerInfo';
import InquiryInfo from './InquiryInfo';
import MovieInfo from './MovieInfo';
import { useTranslation } from 'react-i18next';
import { IMovieBasicInfo } from 'types/db';
import useRequest from 'hooks/useRequest';
import { getMovieInfo } from 'api/movie';

function Register() {
  const { t } = useTranslation();
  const [movSeq, setMovSeq] = useState<number | null>(null);
  const [curStepIdx, setCurStepIdx] = useState<number>(0);
  const [movieInfo, setMoviInfo] = useState<IMovieBasicInfo | null>(null);
  const STEP_SIZE = 5;
  const requestMovieInfo = useRequest<IMovieBasicInfo>(getMovieInfo);
  const fetchData = useCallback(() => {
    requestMovieInfo(movSeq)
      .then((data) => setMoviInfo(data))
      .catch((e) => {
        if (e.code === 'err_content_001') {
          setMoviInfo(null);
        } else {
          console.error(e.message);
        }
      });
  }, [movSeq, curStepIdx]);
  useEffect(() => {
    if (!movSeq || curStepIdx > 1) return;
    fetchData();
  }, [movSeq, curStepIdx]);

  const steps = [
    {
      order: 0,
      label: t('movieInfo'),
      component: (
        <MovieInfo
          step={0}
          setCurStep={setCurStepIdx}
          stepSize={STEP_SIZE}
          movSeq={movSeq}
          setMovSeq={setMovSeq}
          movieInfo={movieInfo}
          loadData={fetchData}
        />
      ),
    },
    {
      order: 1,
      label: t('videoInfo'),
      component: (
        <VideoInfo
          step={1}
          setCurStep={setCurStepIdx}
          stepSize={STEP_SIZE}
          movSeq={movSeq}
          movieInfo={movieInfo}
          loadData={fetchData}
        />
      ),
    },
    {
      order: 2,
      label: t('producerInfo'),
      component: (
        <ProducerInfo
          step={2}
          setCurStep={setCurStepIdx}
          stepSize={STEP_SIZE}
          movSeq={movSeq}
        />
      ),
    },
    {
      order: 3,
      label: t('awardCareer'),
      component: (
        <CareerInfo
          step={3}
          setCurStep={setCurStepIdx}
          stepSize={STEP_SIZE}
          movSeq={movSeq}
        />
      ),
    },
    {
      order: 4,
      label: t('inquiryRequest'),
      component: (
        <InquiryInfo
          step={4}
          setCurStep={setCurStepIdx}
          stepSize={STEP_SIZE}
          movSeq={movSeq}
        />
      ),
    },
  ];

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>{t('reigsterMovie')}</TitleDiv>
          <StepWrapper>
            {steps.map((step) => (
              <StepDiv
                key={step.order}
                selected={step.order === steps[curStepIdx].order}
              >
                {step.label}
              </StepDiv>
            ))}
          </StepWrapper>
          {steps[curStepIdx].component}
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Register;
