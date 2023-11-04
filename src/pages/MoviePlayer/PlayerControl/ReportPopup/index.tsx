import React from 'react';
import { BsCardText } from 'react-icons/bs';
import { SiSpeedtest } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';
import {
  Container,
  ReportTitleDiv,
  ContentDiv,
  TitleDiv,
  DescriptionDiv,
} from './style';
import { useTranslation } from 'react-i18next';

interface ReportType {
  id: number;
  icon?: JSX.Element;
  title: string;
  description: string;
}

/**
 * 신고 팝업 컴포넌트
 */
function ReportPopup({
  showReportPopup,
  closePopup,
}: {
  showReportPopup: boolean;
  closePopup: () => void;
}) {
  const { t } = useTranslation();
  const reportList: ReportType[] = [
    {
      id: 1,
      icon: <SiSpeedtest />,
      title: t('bufferingLoading'),
      description: t('message.message8'),
    },
    {
      id: 2,
      icon: <BsCardText />,
      title: t('subtitlesCaption'),
      description: t('message.message9'),
    },
    {
      id: 3,
      title: t('audioVideo'),
      description: t('message.message10'),
    },
    {
      id: 4,
      title: t('otherProblem'),
      description: t('message.message11'),
    },
  ];

  return (
    <Container visible={showReportPopup}>
      <ReportTitleDiv>
        <div>{t('message.message12')} </div>
        <AiOutlineClose
          size="21"
          onClick={(e) => {
            e.stopPropagation();
            closePopup();
          }}
          style={{ cursor: 'pointer' }}
        />
      </ReportTitleDiv>
      {reportList.map((report) => (
        <ContentDiv key={report.id} isEtc={report.id === 4}>
          <TitleDiv>
            {report.icon && <div>{report.icon}</div>} <div>{report.title}</div>
          </TitleDiv>
          <DescriptionDiv>{report.description}</DescriptionDiv>
        </ContentDiv>
      ))}
    </Container>
  );
}

export default ReportPopup;
