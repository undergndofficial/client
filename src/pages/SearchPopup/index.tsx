import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, SearchInputForm } from './style';
import RecentKeywordResult from './RecentKeywordResult';
/**
 * 검색 팝업 컴포넌트
 */
function SearchPopup({ closeSearchPopup }: { closeSearchPopup: () => void }) {
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
      closeSearchPopup();
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
      <RecentKeywordResult />
    </Container>
  );
}

export default SearchPopup;
