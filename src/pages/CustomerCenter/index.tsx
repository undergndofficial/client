import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React, { useEffect, useState } from 'react';
import {
  Container,
  TitleDiv,
  MenuDiv,
  MenuWrapper,
  ContentDiv,
  MenuTitleDiv,
  SubMenuDiv,
  SubMenuWrapper,
  NoContentDiv,
  Button,
} from './style';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import useRequest from 'hooks/useRequest';
import { getFaqDetail, getFaqList } from 'api/customer';
import { IFaq } from 'types/db';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

// 해당 컴포넌트에서 사용하는 faq 타입
interface IInq {
  inqCat: number;
  inqText: string;
  faqs: { faqTitle: string; seq: number }[];
}

function CustomerCenter() {
  const { t } = useTranslation();
  // faq 데이터
  const [inqList, setInqList] = useState<IInq[]>([]);
  const requestFaqs = useRequest(getFaqList);
  const { data: inqData } = useQuery('get-inq-list', requestFaqs);
  useEffect(() => {
    if (!inqData) return;
    const newFaqs: IInq[] = inqData.reduce<IInq[]>(
      (result: IInq[], item: IFaq) => {
        const existingCategory = result.find(
          (category) => category.inqCat === item.inqCat,
        );
        if (existingCategory) {
          existingCategory.faqs.push({
            faqTitle: item.faqTitle || '',
            seq: item.seq,
          });
        } else {
          result.push({
            inqCat: item.inqCat || 0,
            inqText: item.inqTxt || '',
            faqs: [{ faqTitle: item.faqTitle || '', seq: item.seq }],
          });
        }
        return result;
      },
      [],
    );
    setInqList(newFaqs);
  }, [inqData]);

  // 현재 열린 메뉴들
  const [openMenuIds, setOpenMenuId] = useState<{ [key: string]: boolean }>({});
  const toggleOpenMenuId = (key: string) => {
    setOpenMenuId((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 선택된 faq
  const [curFaq, setCurFaq] = useState<
    { faqTitle: string; seq: number } | undefined
  >(undefined);
  const [content, setContent] = useState<string>('');

  const navigate = useNavigate();

  // faq 불러오기
  const reqeustFaqDetail = useRequest(getFaqDetail);
  useEffect(() => {
    if (isEmpty(curFaq)) return;
    reqeustFaqDetail(curFaq.seq)
      .then((data) => {
        const { faqReply } = data[0];
        if (faqReply) {
          setContent(faqReply);
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [curFaq]);

  return (
    <Layout>
      <PageContent>
        <TitleDiv>{t('help')}</TitleDiv>
        <Container>
          <MenuWrapper>
            <MenuTitleDiv>{t('faqCategory')}</MenuTitleDiv>
            <div>
              {inqList.map((inq) => (
                <div key={inq.inqCat}>
                  <MenuDiv
                    onClick={() => {
                      toggleOpenMenuId(inq.inqCat.toString());
                    }}
                  >
                    <div>{inq.inqText}</div>
                    {openMenuIds[inq.inqCat] ? (
                      <BiChevronUp />
                    ) : (
                      <BiChevronDown />
                    )}
                  </MenuDiv>
                  <SubMenuWrapper selected={openMenuIds[inq.inqCat]}>
                    {inq.faqs.map((faq) => (
                      <SubMenuDiv
                        key={faq.seq}
                        onClick={() => {
                          setCurFaq(faq);
                        }}
                        selected={curFaq?.seq === faq.seq}
                      >
                        {faq.faqTitle}
                      </SubMenuDiv>
                    ))}
                  </SubMenuWrapper>
                </div>
              ))}
            </div>
            <Button
              onClick={() => {
                navigate('/inquiry');
              }}
            >
              {t('oneToOneInquiry')}
            </Button>
          </MenuWrapper>
          {!isEmpty(content) ? (
            <ContentDiv>
              <div>Q {curFaq?.faqTitle}</div>
              {content}
            </ContentDiv>
          ) : (
            <NoContentDiv>{t('message.message7')}</NoContentDiv>
          )}
        </Container>
      </PageContent>
    </Layout>
  );
}

export default CustomerCenter;
