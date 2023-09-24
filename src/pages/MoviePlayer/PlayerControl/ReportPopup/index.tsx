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
  const reportList: ReportType[] = [
    {
      id: 1,
      icon: <SiSpeedtest />,
      title: '버퍼링 및 로딩',
      description: '영상이 흐리거나, 로딩이 지연되거나, 로딩이 되지 않습니다.',
    },
    {
      id: 2,
      icon: <BsCardText />,
      title: '자막 및 캡션',
      description: '자막이나 캡션이 제대로 작동하지 않습니다.',
    },
    {
      id: 3,
      title: '음성 및 영상',
      description: '영상의 소리가 잘 안들리거나 영상이 잘 보이지 않습니다.',
    },
    {
      id: 4,
      title: '다른 문제',
      description: '작동에 다른 문제가 있습니다.',
    },
  ];

  return (
    <Container visible={showReportPopup}>
      <ReportTitleDiv>
        <div>어떤 문제를 겪고 계신가요? </div>
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
