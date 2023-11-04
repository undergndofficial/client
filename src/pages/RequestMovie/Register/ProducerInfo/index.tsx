import React from 'react';
import { FormTitle, Form, ButtonWrapper } from '../style';
import { IRegisterProp } from 'types/props';
import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from 'components/Button';

function ProducerInfo() {
  const { props }: { props: IRegisterProp } = useOutletContext();
  const navigate = useNavigate();
  return (
    <>
      <FormTitle>제작자 정보</FormTitle>
      <Form>제작자 정보</Form>
      <ButtonWrapper>
        {props.prevUrl !== null && (
          <Button
            onClick={() => {
              navigate(`/request-movie/register/${props.prevUrl}`);
            }}
          >
            이전
          </Button>
        )}
        {props.nextUrl !== null ? (
          <Button
            onClick={() => {
              navigate(`/request-movie/register/${props.nextUrl}`);
            }}
          >
            다음
          </Button>
        ) : (
          <Button>등록 신청</Button>
        )}
      </ButtonWrapper>
    </>
  );
}

export default ProducerInfo;
