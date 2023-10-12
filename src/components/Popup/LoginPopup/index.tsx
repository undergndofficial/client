import React, { useCallback, useState } from 'react';
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
  InputWrapper,
  BackButton,
  WarningMessageDiv,
} from './style';
import { IoCloseOutline, IoArrowBack } from 'react-icons/io5';
import { IoMdMail, IoMdLock } from 'react-icons/io';
import useInput from 'hooks/useInput';
import FindPassword from './FindPassword';
import { useNavigate } from 'react-router-dom';
import Checkbox from 'components/Checkbox';
import { isEmpty } from 'lodash';

/**
 * 로그인 팝업 컴포넌트
 */
function LoginPopup({ closeLoginPopup }: { closeLoginPopup: () => void }) {
  const [checkedRemember, setCheckedRemember] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  const [isWarning, setIsWarning] = useState(false);
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [showFindPassword, setShowFindPassword] = useState(false);

  const navigate = useNavigate();

  const setWarning = useCallback((message: string) => {
    setIsWarning(true);
    setWarningMessage(message);
  }, []);

  const validateForm = useCallback(() => {
    if (isEmpty(id.trim())) {
      setWarning('이메일 또는 전화번호를 입력해주세요.');
      return false;
    }
    if (isEmpty(password.trim())) {
      setWarning('비밀번호를 입력해주세요.');
      return false;
    }
    setIsWarning(false);
    return true;
  }, [id, password]);

  const loginProc = useCallback(() => {
    if (!validateForm()) return;
    // const loginId = id.trim();
    // const loginPassword = password.trim();
  }, [id, password]);

  const onKeyDownLoginForm = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        loginProc();
      }
    },
    [id, password],
  );

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <CloseButton>
        <IoCloseOutline onClick={closeLoginPopup} />
      </CloseButton>
      {showFindPassword ? (
        <>
          <BackButton>
            <IoArrowBack
              onClick={() => {
                setShowFindPassword(false);
              }}
            />
          </BackButton>
          <FindPassword />
        </>
      ) : (
        <>
          <LoginTitleDiv>로그인</LoginTitleDiv>
          <LoginForm>
            {isWarning && (
              <WarningMessageDiv>{warningMessage}</WarningMessageDiv>
            )}
            <InputWrapper>
              <div>
                <IoMdMail size="21" />
              </div>
              <input
                placeholder="이메일 또는 전화번호"
                value={id}
                onChange={onChangeId}
                onKeyDown={onKeyDownLoginForm}
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
                onKeyDown={onKeyDownLoginForm}
              />
            </InputWrapper>
            <RememberIdDiv
              onClick={() => {
                setCheckedRemember((prev) => !prev);
              }}
            >
              <Checkbox checked={checkedRemember} />
              <div>&nbsp; 아이디 저장</div>
            </RememberIdDiv>
          </LoginForm>
          <ButtonWrapper>
            <LoginButton onClick={loginProc}>로그인</LoginButton>
            <FindPasswordButton
              onClick={() => {
                setShowFindPassword(true);
              }}
            >
              비밀번호 찾기
            </FindPasswordButton>
          </ButtonWrapper>
          <JoinButton>
            아직 회원이 아니신가요? &nbsp;
            <span
              onClick={() => {
                navigate('/join');
              }}
            >
              회원가입
            </span>
          </JoinButton>
        </>
      )}
    </Container>
  );
}

export default LoginPopup;