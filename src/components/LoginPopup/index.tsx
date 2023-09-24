import React, { useState } from 'react';
import {
  Container,
  CloseButton,
  LoginTitleDiv,
  RememberIdDiv,
  LoginForm,
  ButtonWrapper,
  LoginButton,
  FindPasswordButton,
  JoinButton,
  CheckBoxDiv,
  InputWrapper,
} from './style';
import { IoCloseOutline } from 'react-icons/io5';
import { IoMdMail, IoMdLock } from 'react-icons/io';
import useInput from 'hooks/useInput';

/**
 * 로그인 팝업 컴포넌트
 */
function LoginPopup({ closeLoginPopup }: { closeLoginPopup: () => void }) {
  const [checkedRemember, setCheckedRemember] = useState(false);
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CloseButton>
        <IoCloseOutline onClick={closeLoginPopup} />
      </CloseButton>
      <LoginTitleDiv>로그인</LoginTitleDiv>
      <LoginForm>
        <InputWrapper>
          <div>
            <IoMdMail size="21" />
          </div>
          <input
            placeholder="이메일 또는 전화번호"
            value={id}
            onChange={onChangeId}
          />
        </InputWrapper>
        <InputWrapper>
          <div>
            <IoMdLock size="21" />
          </div>
          <input
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={onChangePassword}
          />
        </InputWrapper>
        <RememberIdDiv
          onClick={() => {
            setCheckedRemember((prev) => !prev);
          }}
        >
          <CheckBoxDiv>{checkedRemember && '✓'}</CheckBoxDiv>
          <div>&nbsp; 아이디 저장</div>
        </RememberIdDiv>
      </LoginForm>
      <ButtonWrapper>
        <LoginButton>로그인</LoginButton>
        <FindPasswordButton>비밀번호 찾기</FindPasswordButton>
      </ButtonWrapper>
      <JoinButton>
        아직 회원이 아니신가요? &nbsp;<span>회원가입</span>
      </JoinButton>
    </Container>
  );
}

export default LoginPopup;
