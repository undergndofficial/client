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

// 해당 컴포넌트에서 사용하는 faq 타입
interface IInq {
  inqCat: number;
  inqText: string;
  faqs: { faqTitle: string; seq: number }[];
}

function CustomerCenter() {
  // faq 데이터
  const [inqList, setInqList] = useState<IInq[]>([]);
  const requestFaqs = useRequest(getFaqList);
  useEffect(() => {
    requestFaqs().then((data) => {
      const newFaqs: IInq[] = (data as IFaq[]).reduce<IInq[]>(
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
    });
  }, []);

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
    reqeustFaqDetail(curFaq.seq).then((data) => {
      const { faqReply } = (data as IFaq[])[0];
      if (faqReply) {
        setContent(faqReply);
      }
    });
  }, [curFaq]);

  return (
    <Layout>
      <PageContent>
        <TitleDiv>고객센터</TitleDiv>
        <Container>
          <MenuWrapper>
            <MenuTitleDiv>FAQ 카테고리</MenuTitleDiv>
            <div>
              {inqList.map((inq, i) => (
                <>
                  <MenuDiv
                    key={i}
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
                    {inq.faqs.map((faq, i) => (
                      <SubMenuDiv
                        key={i}
                        onClick={() => {
                          setCurFaq(faq);
                        }}
                        selected={curFaq?.seq === faq.seq}
                      >
                        {faq.faqTitle}
                      </SubMenuDiv>
                    ))}
                  </SubMenuWrapper>
                </>
              ))}
            </div>
            <Button
              onClick={() => {
                navigate('/inquiry');
              }}
            >
              1 대 1 문의
            </Button>
          </MenuWrapper>
          {!isEmpty(content) ? (
            <ContentDiv>
              <div>Q {curFaq?.faqTitle}</div>
              {content}
            </ContentDiv>
          ) : (
            <NoContentDiv>
              FAQ 카테고리에서 문의하실 내용을 선택해주세요.
            </NoContentDiv>
          )}
        </Container>
      </PageContent>
    </Layout>
  );
}

export default CustomerCenter;
