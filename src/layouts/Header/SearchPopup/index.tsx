import React, { useCallback, useState } from 'react';
import { Container, SearchInputDiv, TabWrapper, TabDiv } from './style';
import RecentKeywordResult from './RecentKeywordResult';

/**
 * 검색 팝업 컴포넌트
 */
function SearchPopup() {
  // 탭 목록
  const RECENT = 'recent';
  const TOP = 'top';
  const tabList = [
    { id: RECENT, label: '최근 검색어' },
    { id: TOP, label: '인기 검색어' },
  ];

  const [curTab, setCurTab] = useState(tabList[0]);
  const [keyowrd, setKeyword] = useState('');
  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    [],
  );

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <SearchInputDiv>
        <input
          placeholder="검색어"
          value={keyowrd}
          onChange={onChangeKeyword}
        />
      </SearchInputDiv>
      <TabWrapper>
        {tabList.map((tab) => (
          <TabDiv
            key={tab.id}
            onClick={() => {
              setCurTab(tab);
            }}
            selected={tab.id === curTab.id}
          >
            {tab.label}
          </TabDiv>
        ))}
      </TabWrapper>
      {curTab.id === RECENT && <RecentKeywordResult />}
    </Container>
  );
}

export default SearchPopup;
