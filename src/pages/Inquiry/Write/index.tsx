import React, { useCallback, useState } from 'react';
import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import {
  Container,
  TitleDiv,
  WriteForm,
  FormItemDiv,
  Label,
  Textarea,
  WriteButton,
  SelectWrapper,
} from './style';
import Input from 'components/Input';
import Select from 'components/Select';
import useInput from 'hooks/useInput';
import { ActionMeta, SingleValue } from 'react-select';

/**
 * 1대1 문의 작성 페이지
 */
function WriteInquiry() {
  const [title, onChangeTitle] = useInput('');
  const [content, onChangeContent] = useInput('');
  const [, setType] = useState('');

  // 유형 변경 핸들러
  const onChangeType = useCallback(
    (
      newValue: SingleValue<{ label: string; value: string }>,
      actionMeta: ActionMeta<{ label: string; value: string }>,
    ) => {
      if (actionMeta.action === 'select-option') {
        setType(newValue?.value as string);
      } else if (actionMeta.action === 'clear') {
        setType('');
      }
    },
    [],
  );

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>1대1 문의</TitleDiv>
          <WriteForm>
            <FormItemDiv>
              <Label>문의 제목</Label>
              <Input
                value={title}
                onChange={onChangeTitle}
                placeholder="문의 제목을 입력해주세요"
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>문의 유형</Label>
              <SelectWrapper>
                <Select
                  placeholder="유형 선택"
                  onChange={() => {
                    onChangeType;
                  }}
                  options={[{ label: '문의 유형', value: 'tmp' }]}
                />
              </SelectWrapper>
            </FormItemDiv>
            <FormItemDiv>
              <Label alignSelf="start">문의 내용</Label>
              <Textarea
                placeholder="1대1 문의 내용을 입력해주세요"
                value={content}
                onChange={onChangeContent}
              />
            </FormItemDiv>
          </WriteForm>
          <WriteButton width="10rem">1대1 문의 등록</WriteButton>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default WriteInquiry;
