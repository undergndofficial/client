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
} from './style';
import Input from 'components/Input';
import Button from 'components/Button';
import useInput from 'hooks/useInput';
import { isEmpty } from 'lodash';
import useRequest from 'hooks/useRequest';
import { requestMovie } from 'api/movie';
import { IRequestMovie } from 'types/db';
import useTagInput from 'hooks/useTagInput';
import InputTagList from 'components/InputTagList';
import { useTranslation } from 'react-i18next';

function Request() {
  const { t } = useTranslation();
  const [title, onChangeTitle, setTitle] = useInput('');
  const [director, onChangeDirector, setDirector] = useInput('');
  const [isComposing, setIsComposing] = useState(false);

  // 해당 인덱스의 감독 삭제
  const [
    directorList,
    setDirectorList,
    deleteDirector,
    addDirectorList,
    onKeyDownDirector,
  ] = useTagInput(setDirector, isComposing);

  // 유효성 검사
  const validate = useCallback(() => {
    if (!title.trim()) {
      return false;
    }
    if (isEmpty(directorList)) {
      return false;
    }
    return true;
  }, [title, directorList]);

  // 영화 요청
  const requestRequestMovie = useRequest<boolean>(requestMovie);
  const requestProc = useCallback(() => {
    if (!validate()) return;
    const movie: IRequestMovie = {
      movTitle: title,
      directors: directorList.join(','),
    };
    requestRequestMovie(movie)
      .then(() => {
        setTitle('');
        setDirectorList([]);
        alert(t('message.message44'));
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [title, directorList]);

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>{t('requestMovie')}</TitleDiv>
          <RequestForm>
            <FormItemDiv>
              <Label>{t('title')}</Label>
              <Input
                placeholder={t('message.message46')}
                value={title}
                onChange={onChangeTitle}
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>{t('director')}</Label>
              <>
                <Input
                  placeholder={t('message.message45')}
                  value={director}
                  onChange={onChangeDirector}
                  onKeyDown={(e) => {
                    onKeyDownDirector(e, director);
                  }}
                  onCompositionStart={() => setIsComposing(true)}
                  onCompositionEnd={() => setIsComposing(false)}
                />
                <Button
                  onClick={() => {
                    addDirectorList(director);
                  }}
                >
                  {t('add')}
                </Button>
              </>
              <DirectorListDiv>
                <InputTagList
                  tagList={directorList}
                  deleteTag={deleteDirector}
                />
              </DirectorListDiv>
            </FormItemDiv>
          </RequestForm>
          <RequestButton onClick={requestProc}>{t('request')}</RequestButton>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Request;
