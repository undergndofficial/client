import { searchFilmPeople } from 'api/movie';
import Input from 'components/Input';
import useRequest from 'hooks/useRequest';
import { debounce, isEmpty } from 'lodash';
import React, { useCallback, useState } from 'react';
import { IFilmpeople } from 'types/db';
import { Container, SearchResultDiv } from './style';

interface IProps {
  movSeq: number | null;
  addProducer: (fpSeq: number) => void;
}

function SearchFilmPeople({ movSeq, addProducer }: IProps) {
  const requestSearchFilm = useRequest<IFilmpeople[]>(searchFilmPeople);
  const [searchResults, setSearchResults] = useState<IFilmpeople[]>([]);
  const [keyword, setKeyword] = useState('');
  // 키워드 입력 될 때 마다 검색 api 호출
  const onChangeKeyword = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setKeyword(value);
      if (value.trim()) {
        searchProc(value);
      } else {
        setSearchResults([]);
      }
    },
    [],
  );

  // 검색 api 호출
  const searchProc = debounce((keyword) => {
    requestSearchFilm({ movSeq, keyword })
      .then((data) => {
        setSearchResults(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, 200);

  // 영화인 이름 클릭 핸들러
  const onClickName = useCallback(
    (fpSeq: number) => {
      addProducer(fpSeq);
      setKeyword('');
      setSearchResults([]);
    },
    [addProducer],
  );

  return (
    <Container>
      <Input
        placeholder="영화인 검색"
        value={keyword}
        onChange={onChangeKeyword}
      />
      {!isEmpty(searchResults) && (
        <SearchResultDiv>
          {searchResults.map((item) => (
            <div
              onClick={() => {
                onClickName(item.fpSeq);
              }}
              key={item.fpSeq}
            >
              {item.fpKoName}
            </div>
          ))}
        </SearchResultDiv>
      )}
    </Container>
  );
}

export default SearchFilmPeople;
