import React from 'react';
import {
  Form,
  FormItemDiv,
  Textarea,
  FormTitle,
  ButtonWrapper,
} from '../style';
import useInput from 'hooks/useInput';
import { IRegisterProp } from 'types/props';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import useRequest from 'hooks/useRequest';
import { registerRemark } from 'api/movie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function InquiryInfo({ movSeq, step, setCurStep, stepSize }: IRegisterProp) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [remark, onChangeRemark] = useInput('');
  // 문의 등록 후 등록 요청
  const requestRemarkInfo = useRequest<boolean>(registerRemark);
  // 다음 버튼 클릭
  const onClickNextButton = async () => {
    if (remark) {
      await requestRemarkInfo({
        movSeq: movSeq,
        remark,
      }).catch((e) => {
        console.error(e.message);
      });
    }
    toast.success('영화 등록을 신청하였습니다.');
    navigate(-1);
  };

  return (
    <>
      <FormTitle>문의/요청</FormTitle>
      <Form>
        <FormItemDiv>
          <Textarea value={remark} onChange={onChangeRemark} />
        </FormItemDiv>
      </Form>

      <ButtonWrapper>
        {step > 0 && (
          <Button
            onClick={() => {
              setCurStep(step - 1);
            }}
          >
            {t('prev')}
          </Button>
        )}
        {step < stepSize - 1 ? (
          <Button
            onClick={() => {
              setCurStep(step + 1);
            }}
          >
            {t('next')}
          </Button>
        ) : (
          <Button onClick={onClickNextButton}>{t('registerRequest')}</Button>
        )}
      </ButtonWrapper>
    </>
  );
}

export default InquiryInfo;
