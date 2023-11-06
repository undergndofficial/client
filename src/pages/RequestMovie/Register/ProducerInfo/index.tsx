import React from 'react';
import { FormTitle, Form, ButtonWrapper } from '../style';
import { IRegisterProp } from 'types/props';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';

function ProducerInfo({
  /* movSeq,*/
  step,
  setCurStep,
  stepSize,
}: IRegisterProp) {
  const { t } = useTranslation();
  return (
    <>
      <FormTitle>제작자 정보</FormTitle>
      <Form>제작자 정보</Form>

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
          <Button>{t('registerRequest')}</Button>
        )}
      </ButtonWrapper>
    </>
  );
}

export default ProducerInfo;
