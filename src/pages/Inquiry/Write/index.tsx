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
import { useTranslation } from 'react-i18next';

/**
 * 1대1 문의 작성 페이지
 */
function WriteInquiry() {
  const { t } = useTranslation();
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
          <TitleDiv>{t('oneToOneInquiry')}</TitleDiv>
          <WriteForm>
            <FormItemDiv>
              <Label>{t('inquiryTitle')}</Label>
              <Input
                value={title}
                onChange={onChangeTitle}
                placeholder={t('message.message6')}
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>{t('inquiryType')}</Label>
              <SelectWrapper>
                <Select
                  placeholder={t('selectType')}
                  onChange={onChangeType}
                  options={[{ label: `${t('inquiryType')}`, value: 'tmp' }]}
                />
              </SelectWrapper>
            </FormItemDiv>
            <FormItemDiv>
              <Label alignSelf="start">{t('inquiryContent')}</Label>
              <Textarea
                placeholder={t('message.message5')}
                value={content}
                onChange={onChangeContent}
              />
            </FormItemDiv>
          </WriteForm>
          <WriteButton width="10rem">
            {t('registeroneToOneInquiry')}
          </WriteButton>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default WriteInquiry;
