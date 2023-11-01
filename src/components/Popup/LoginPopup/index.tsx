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
import useRequest from 'hooks/useRequest';
import { signin } from 'api/member';
import { IUser } from 'types/db';

/**
 * 로그인 팝업 컴포넌트
 */
function LoginPopup({ closeLoginPopup }: { closeLoginPopup: () => void }) {
  // 경고 문구
  const [isWarning, setIsWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  // 아이디, 비밀번호, 비밀번호 기억
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [checkedRemember, setCheckedRemember] = useState(false);
  // 비밀번호 찾기 보여주기 여부
  const [showFindPassword, setShowFindPassword] = useState(false);
  // 로그인 요청
  const requestLogin = useRequest<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }>(signin);

  const navigate = useNavigate();

  // 경고문구 설정
  const setWarning = useCallback((message: string) => {
    setIsWarning(true);
    setWarningMessage(message);
  }, []);

  // 유효성 검사
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

  // 로그인 요청
  const loginProc = useCallback(() => {
    if (!validateForm()) return;
    const loginInfo = {
      memId: id.trim(),
      memPass: password.trim(),
    };
    requestLogin(loginInfo)
      .then((data) => {
        const { accessToken, refreshToken } = data;
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
        }
        window.location.href = '/';
      })
      .catch((e) => {
        if (
          e.code === 'err_004' ||
          e.code === 'err_005' ||
          e.code === 'err_006' ||
          e.code === 'err_007' ||
          e.code === 'err_008'
        ) {
          setWarning(e.message);
        }
        console.error(e.message);
      });
  }, [id, password]);

  // 엔터키로도 로그인 폼 제출
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
