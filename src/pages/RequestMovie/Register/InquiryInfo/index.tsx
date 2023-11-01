import React from 'react';
import { Form, FormItemDiv, Textarea } from '../style';
import useInput from 'hooks/useInput';

function InquiryInfo() {
  const [remark, onChangeRemark] = useInput('');
  return (
    <Form>
      <FormItemDiv>
        <Textarea value={remark} onChange={onChangeRemark} />
      </FormItemDiv>
    </Form>
  );
}

export default InquiryInfo;
