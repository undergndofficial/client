import React, { useCallback } from 'react';
import {
  RecentKeywordWrapper,
  RecentKeywordDiv,
  DeleteButton,
  AllDeleteButton,
  EmptyResultDiv,
} from './style';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

/**
 * 최근 검색어 결과 컴포넌트
 */
function RecentKeywordResult() {
  const { t } = useTranslation();
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
          <div>{t('message.message15')}</div>
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
            <div>{t('message.message14')}</div>
          </AllDeleteButton>
        </>
      )}
    </div>
  );
}

export default RecentKeywordResult;
