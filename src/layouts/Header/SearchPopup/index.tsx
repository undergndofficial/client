import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, SearchInputForm, TabWrapper, TabDiv } from './style';
import RecentKeywordResult from './RecentKeywordResult';
import TopKeywordResult from './TopKeywordResult';

/**
 * 검색 팝업 컴포넌트
 */
function SearchPopup({
  setShowSearchPopup,
}: {
  setShowSearchPopup: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  // 탭 목록
  const RECENT = 'recent';
  const TOP = 'top';
  const tabList = [
    { id: RECENT, label: '최근 검색어' },
    { id: TOP, label: '인기 검색어' },
  ];

  const [curTab, setCurTab] = useState(tabList[0]);
  const [keyword, setKeyword] = useState('');
  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(e.target.value);
    },
    [],
  );

  // 검색 결과 페이지로 이동
  const navigate = useNavigate();
  const onSubmitSearchForm = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setShowSearchPopup(false);
      navigate(`/search/${keyword}`);
    },
    [keyword],
  );

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <SearchInputForm onSubmit={onSubmitSearchForm}>
        <input
          placeholder="검색어"
          value={keyword}
          onChange={onChangeKeyword}
        />
        <button />
      </SearchInputForm>
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
      {curTab.id === TOP && <TopKeywordResult />}
    </Container>
  );
}

export default SearchPopup;
