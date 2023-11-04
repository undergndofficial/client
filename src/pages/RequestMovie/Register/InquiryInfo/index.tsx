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
import { useNavigate, useOutletContext } from 'react-router-dom';
import Button from 'components/Button';

function InquiryInfo() {
  const { props }: { props: IRegisterProp } = useOutletContext();
  const navigate = useNavigate();
  const [remark, onChangeRemark] = useInput('');
  return (
    <>
      <FormTitle>문의/요청</FormTitle>
      <Form>
        <FormItemDiv>
          <Textarea value={remark} onChange={onChangeRemark} />
        </FormItemDiv>
      </Form>
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

export default InquiryInfo;
