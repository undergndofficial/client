import React, { useCallback } from 'react';
import {
  RecentKeywordWrapper,
  RecentKeywordDiv,
  EmptyResultDiv,
} from './style';
import { useNavigate } from 'react-router-dom';

/**
 * 인기 검색어 결과 컴포넌트
 */
function TopKeywordResult() {
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
          <div>인기 검색어가 없습니다</div>
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
                <div>
                  {i < 3 && (
                    <img
                      src={`${process.env.PUBLIC_URL}/assets/top${
                        i + 1
                      }-icon.svg`}
                    />
                  )}
                  {keyword}
                </div>
              </RecentKeywordDiv>
            ))}
          </RecentKeywordWrapper>
        </>
      )}
    </div>
  );
}

export default TopKeywordResult;
