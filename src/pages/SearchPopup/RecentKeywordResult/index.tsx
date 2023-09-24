import React, { useCallback } from 'react';
import {
  RecentKeywordWrapper,
  RecentKeywordDiv,
  DeleteButton,
  AllDeleteButton,
  EmptyResultDiv,
} from './style';
import { useNavigate } from 'react-router-dom';

/**
 * 최근 검색어 결과 컴포넌트
 */
function RecentKeywordResult() {
  // 임시 데이터
  const keywords: string[] = [
    '파수꾼',
    '메멘토모리',
    '소공녀',
    '올드마린보이',
    '돼지의 왕',
    '워낭소리',
    '파수꾼',
    '메멘토모리',
    '소공녀',
    '올드마린보이',
    '돼지의 왕',
    '워낭소리',
    '파수꾼',
    '메멘토모리',
    '소공녀',
    '올드마린보이',
    '돼지의 왕',
    '워낭소리',
    '파수꾼',
    '메멘토모리',
    '소공녀',
    '올드마린보이',
    '돼지의 왕',
    '워낭소리',
  ];

  const navigate = useNavigate();
  const onClickKeyword = useCallback((keyword: string) => {
    navigate(`/search/${keyword}`);
  }, []);

  return (
    <div>
      {keywords.length === 0 ? (
        <EmptyResultDiv>
          <div>최근 검색기록이 없습니다</div>
        </EmptyResultDiv>
      ) : (
        <>
          <RecentKeywordWrapper>
            {keywords.map((keyword, i) => (
              <RecentKeywordDiv
                key={i}
                onClick={() => {
                  onClickKeyword(keyword);
                }}
              >
                <div>{keyword}</div>
                <DeleteButton>&times;</DeleteButton>
              </RecentKeywordDiv>
            ))}
          </RecentKeywordWrapper>
          <AllDeleteButton>
            <div>검색기록 모두 삭제</div>
          </AllDeleteButton>
        </>
      )}
    </div>
  );
}

export default RecentKeywordResult;
