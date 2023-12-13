import React, { useCallback, useEffect, useState } from 'react';
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
  WarningMessageDiv,
} from './style';
import Input from 'components/Input';
import Select from 'components/Select';
import { useTranslation } from 'react-i18next';
import { IFaqCategory, IQna } from 'types/db';
import { getFaqCategoryList } from 'api/common';
import useRequest from 'hooks/useRequest';
import useSelect from 'hooks/useSelect';
import { getSelectOptionList } from 'utils/common';
import { useForm } from 'react-hook-form';
import { addQna, getQnaDetail, updateQna } from 'api/customer';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { QueryFunctionContext, QueryKey, useQuery } from 'react-query';

/**
 * 1대1 문의 작성 페이지
 */
function WriteInquiry() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams(); // 수정일 경우 문의 seq
  // 문의 유형
  const [category, setCategory] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [categories, setCategories, onChangeCategory] = useSelect((option) => {
    setCategory(option);
  });
  // 1:1 문의 폼 정보
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<{ title: string; content: string }>({
    mode: 'onSubmit',
  });
  // 수정 모드인지 판단
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    if (id) setEditMode(true);
    else setEditMode(false);
  }, [id]);
  // 수정 모드일 경우 기본 정보 설정
  const requestNotice = useRequest<IQna>(getQnaDetail);
  const { data: qna } = useQuery<IQna>({
    queryKey: ['get-qna', { id }],
    queryFn: (context: QueryFunctionContext<QueryKey, unknown>) => {
      const [, queryParams] = context.queryKey as [string, { id: string }];
      return requestNotice(queryParams.id);
    },
  });
  useEffect(() => {
    if (!editMode || !qna) return;
    setValue('title', qna.inqTitle);
    setValue('content', qna.inqBody);
    setCategory({ label: qna.inqTxt, value: qna.inqCat.toString() });
  }, [editMode, qna]);

  // 카테고리 리스트를 select option으로 가공
  const requestCategory = useRequest<IFaqCategory[]>(getFaqCategoryList);
  const { data: faqCategory } = useQuery<IFaqCategory[]>(
    'get-faq-category',
    requestCategory,
  );
  useEffect(() => {
    if (!faqCategory) return;
    const optionData = faqCategory as unknown as { [key: string]: string }[];
    const categoryOption = getSelectOptionList(optionData, 'inqTxt', 'inqCat');
    setCategories(categoryOption);
    if (!isEmpty(categoryOption)) {
      setCategory(categoryOption[0]);
    }
  }, [faqCategory]);

  // 일대일 문의 작성
  const requestWrite = useRequest<boolean>(addQna);
  const requestUpdate = useRequest<boolean>(updateQna);
  const onClickWriteButton = useCallback(
    (data: { title: string; content: string }) => {
      const newQna = {
        inqCat: category?.value,
        inqTitle: data.title,
        inqBody: data.content,
      };
      if (editMode) {
        requestUpdate({ params: newQna, id })
          .then(() => {
            toast.success('1대1 문의를 수정하였습니다.');
            navigate(-1);
          })
          .catch((e) => {
            if (e.code === 'err_content_002') {
              toast.error(e.message);
              return;
            }
            console.error(e);
          });
      } else {
        requestWrite(newQna)
          .then(() => {
            toast.success('1대1 문의를 작성하였습니다.');
            navigate(-1);
          })
          .catch((e) => {
            console.error(e);
          });
      }
    },
    [category],
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
                placeholder={t('message.message6')}
                {...register('title', {
                  required: t('message.message6'),
                })}
              />
              {errors.title && (
                <WarningMessageDiv>{errors.title.message}</WarningMessageDiv>
              )}
            </FormItemDiv>
            <FormItemDiv>
              <Label>{t('inquiryType')}</Label>
              <SelectWrapper>
                <Select
                  placeholder={t('selectType')}
                  onChange={onChangeCategory}
                  options={categories}
                  value={category}
                />
              </SelectWrapper>
            </FormItemDiv>
            <FormItemDiv>
              <Label alignSelf="start">{t('inquiryContent')}</Label>
              <Textarea
                placeholder={t('message.message5')}
                {...register('content', {
                  required: t('message.message5'),
                })}
              />
              {errors.content && (
                <WarningMessageDiv>{errors.content.message}</WarningMessageDiv>
              )}
            </FormItemDiv>
          </WriteForm>
          <WriteButton width="10rem" onClick={handleSubmit(onClickWriteButton)}>
            {editMode
              ? t('updateoneToOneInquiry')
              : t('registeroneToOneInquiry')}
          </WriteButton>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default WriteInquiry;
