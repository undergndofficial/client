import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React, { useCallback, useEffect, useState } from 'react';
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

function CustomerCenter() {
  // 임시 데이터
  const categoryList = [
    {
      name: '계정',
      subCategories: [
        { name: '로그인이 안돼요', id: 1 },
        { name: '비밀번호를 잊어버렸어요', id: 2 },
      ],
    },
    {
      name: '결제',
      subCategories: [
        { name: '로그인이 안돼요', id: 3 },
        { name: '비밀번호를 잊어버렸어요', id: 4 },
      ],
    },
    {
      name: '영화등록 문의',
      subCategories: [
        { name: '로그인이 안돼요', id: 5 },
        { name: '비밀번호를 잊어버렸어요', id: 6 },
      ],
    },
    {
      name: '오류',
      subCategories: [
        { name: '로그인이 안돼요', id: 7 },
        { name: '비밀번호를 잊어버렸어요', id: 8 },
      ],
    },
  ];
  const [openMenuIds, setOpenMenuId] = useState<{ [key: string]: boolean }>({});
  const [content, setContent] = useState<
    Partial<{ title: string; content: string }>
  >({});
  const [curSubMenu, setCurSubMenu] = useState(-1);

  const navigate = useNavigate();

  const toggleOpenMenuId = (key: string) => {
    setOpenMenuId((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  useEffect(() => {
    if (curSubMenu === -1) return;
    setContent({
      title: '로그인이 안돼요',
      content: `
          로그인에 문제가 발생하는 경우 다음과 같은 단계를 따라 해결해 볼 수 있습니다:
          1. 사용자 이름과 비밀번호 확인: 올바른 사용자 이름과 비밀번호를 입력했는지 확인하십시오. 대소문자를 구분하는 경우에도 주의해야 합니다. 비밀번호가 기억나지 않는다면, 비밀번호 재설정 옵션을 사용하여 새 비밀번호를 설정하십시오.
          2. 인터넷 연결 확인: 로그인에는 인터넷 연결이 필요합니다. 인터넷에 연결되어 있는지 확인하고, 필요한 경우 다른 웹 사이트를 방문하여 연결 상태를 확인해 보십시오.
          3. 캐시와 쿠키 삭제: 브라우저의 캐시와 쿠키를 삭제해 보십시오. 이를 통해 이전에 저장된 잘못된 정보가 제거될 수 있습니다. 브라우저 설정에서 캐시와 쿠키 삭제 옵션을 찾을 수 있습니다.
          4. 브라우저 업데이트: 사용 중인 브라우저가 최신 버전인지 확인하십시오. 때로는 오래된 브라우저 버전에서 로그인에 문제가 발생할 수 있습니다. 브라우저 제조사의 웹 사이트에서 최신 버전으로 업데이트할 수 있습니다.
          5. 보안 소프트웨어 확인: 컴퓨터에 설치된 보안 소프트웨어(방화벽, 안티바이러스 등)가 로그인을 차단하지 않는지 확인하십시오. 필요한 경우 임시로 이러한 소프트웨어를 비활성화하거나 예외 규칙을 추가하여 로그인 시도를 허용할 수 있습니다.
          6. 다른 브라우저나 기기 사용: 문제가 계속되면 다른 브라우저나 다른 기기(스마트폰, 태블릿 등)를 사용하여 로그인을 시도해 보십시오. 때로는 특정 브라우저나 기기에서만 로그인 문제가 발생할 수 있습니다.
          7. 서비스 제공자에 문의: 위 단계를 따라 해결되지 않는 경우, 해당 서비스의 고객 지원팀에 문의하여 도움을 요청할 수 있습니다. 서비스 제공자는 더 자세한 지원을 제공할 수 있습니다.
          
          위의 단계를 따라 해결할 수 없다면, 해당 서비스의 로그인 문제를 해결하는 데 도움을 줄 수 있는 더 구체적인 정보를 제공해 주시면 더 자세한 도움을 드릴 수 있습니다.
          `,
    });
  }, [curSubMenu]);

  return (
    <Layout>
      <PageContent>
        <TitleDiv>고객센터</TitleDiv>
        <Container>
          <MenuWrapper>
            <MenuTitleDiv>FAQ 카테고리</MenuTitleDiv>
            <div>
              {categoryList.map((c, i) => (
                <>
                  <MenuDiv
                    key={i}
                    onClick={() => {
                      toggleOpenMenuId(i.toString());
                    }}
                  >
                    <div>{c.name}</div>
                    {openMenuIds[i] ? <BiChevronUp /> : <BiChevronDown />}
                  </MenuDiv>
                  <SubMenuWrapper selected={openMenuIds[i]}>
                    {c.subCategories.map((sc, i) => (
                      <SubMenuDiv
                        key={i}
                        onClick={() => {
                          setCurSubMenu(sc.id);
                        }}
                        selected={curSubMenu === sc.id}
                      >
                        {sc.name}
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
              <div>Q {content.title}</div>
              {content.content}
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
