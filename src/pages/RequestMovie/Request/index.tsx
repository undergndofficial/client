import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import React, { useState, useCallback } from 'react';
import {
  Container,
  TitleDiv,
  RequestForm,
  FormItemDiv,
  Label,
  RequestButton,
  DirectorListDiv,
  DirectorTagDiv,
} from './style';
import Input from 'components/Input';
import Button from 'components/Button';
import useInput from 'hooks/useInput';
import { isEmpty } from 'lodash';

function Request() {
  const [directorList, setDirectorList] = useState<string[]>([]);
  const [title, onChangeTitle] = useInput('');
  const [director, onChangeDirector, setDirector] = useInput('');

  // 해당 인덱스의 감독 삭제
  const deleteDirector = useCallback(
    (index: number) => {
      setDirectorList(directorList.filter((_, i) => index !== i));
    },
    [directorList],
  );

  // 입력한 감독을 감독 리스트에 추가
  const addDirectorList = useCallback(() => {
    const addItem = director.trim();
    if (isEmpty(addItem)) return;
    setDirector('');
    setDirectorList((prev) => [...prev, addItem]);
  }, [director, directorList]);

  // 엔터키 눌렀을때도 감독 리스트에 추가
  const onKeyDownDirector = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        addDirectorList();
      }
    },
    [director, directorList],
  );

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>영화 요청</TitleDiv>
          <RequestForm>
            <FormItemDiv>
              <Label>제목</Label>
              <Input
                placeholder="영화 제목을 입력해주세요"
                value={title}
                onChange={onChangeTitle}
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>감독</Label>
              <>
                <Input
                  placeholder="감독 이름을 입력해주세요"
                  value={director}
                  onChange={onChangeDirector}
                  onKeyDown={onKeyDownDirector}
                />
                <Button onClick={addDirectorList}>추가</Button>
              </>
              <DirectorListDiv>
                {directorList.map((d, i) => (
                  <DirectorTagDiv key={i}>
                    {d}
                    <div
                      onClick={() => {
                        deleteDirector(i);
                      }}
                    >
                      &times;
                    </div>
                  </DirectorTagDiv>
                ))}
              </DirectorListDiv>
            </FormItemDiv>
          </RequestForm>
          <RequestButton>요청</RequestButton>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Request;
