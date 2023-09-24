import React, { useCallback, useState } from 'react';
import Layout from 'layouts/Layout';
import PageContent from 'layouts/PageContent';
import {
  Container,
  TitleDiv,
  JoinForm,
  FormItemDiv,
  Label,
  FlexWrapper,
  AuthButton,
  TermsButton,
} from './style';
import Input from 'components/Input';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import useInput from 'hooks/useInput';

/**
 * 회원 가입 페이지
 */
function Join() {
  const [email, onChangeEmail] = useInput('');
  const [authcode, onChangeAuthcode] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordRe, onChangePasswordRe] = useInput('');
  const [phone, onChangePhone] = useInput('');
  const [smsAgree, setSmsAgree] = useState(false);
  const [emailAgree, setEmailAgree] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const onClickSendAuthcode = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      setShowAuthForm(true);
    },
    [],
  );

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>회원가입</TitleDiv>
          <JoinForm>
            <FormItemDiv>
              <Label>이메일</Label>
              <>
                <Input
                  placeholder="E-mail을 입력해주세요"
                  value={email}
                  onChange={onChangeEmail}
                />
                <Button onClick={onClickSendAuthcode}>인증번호 받기</Button>
              </>
            </FormItemDiv>
            {showAuthForm && (
              <FormItemDiv>
                <Label />
                <>
                  <Input
                    placeholder="인증번호 입력"
                    width="30%"
                    value={authcode}
                    onChange={onChangeAuthcode}
                  />
                  <AuthButton>인증</AuthButton>
                </>
              </FormItemDiv>
            )}
            <FormItemDiv>
              <Label>비밀번호</Label>
              <Input
                placeholder="10자~20자, 특수문자 포함"
                type="password"
                value={password}
                onChange={onChangePassword}
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>비밀번호 확인</Label>
              <Input
                placeholder="10자~20자, 특수문자 포함"
                type="password"
                value={passwordRe}
                onChange={onChangePasswordRe}
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>연락처</Label>
              <Input
                placeholder="전화번호 입력(-포함)"
                value={phone}
                onChange={onChangePhone}
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>수신동의</Label>
              <FlexWrapper gap="2">
                <FlexWrapper
                  onClick={() => {
                    setSmsAgree((prev) => !prev);
                  }}
                >
                  <Checkbox checked={smsAgree} />
                  SMS 수신동의
                </FlexWrapper>
                <FlexWrapper
                  onClick={() => {
                    setEmailAgree((prev) => !prev);
                  }}
                >
                  <Checkbox checked={emailAgree} />
                  e-mail 수신동의
                </FlexWrapper>
                <TermsButton>약관확인</TermsButton>
              </FlexWrapper>
            </FormItemDiv>
          </JoinForm>
          <Button>회원가입</Button>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Join;
