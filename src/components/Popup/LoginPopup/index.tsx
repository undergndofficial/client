import React, { useCallback, useEffect, useState } from 'react';
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
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

/**
 * 로그인 팝업 컴포넌트
 */
function LoginPopup({ closeLoginPopup }: { closeLoginPopup: () => void }) {
  const { t } = useTranslation();
  // 경고 문구
  const [isWarning, setIsWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
  // 아이디, 비밀번호, 아이디 기억
  const [id, onChangeId, setId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [checkedRemember, setCheckedRemember] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberId']);
  // 비밀번호 찾기 보여주기 여부
  const [showFindPassword, setShowFindPassword] = useState(false);
  // 로그인 요청
  const requestLogin = useRequest<{
    user: IUser;
    accessToken: string;
    refreshToken: string;
  }>(signin);

  const navigate = useNavigate();

  // 저장된 아이디 설정
  useEffect(() => {
    if (cookies.rememberId !== undefined) {
      setId(cookies.rememberId);
      setCheckedRemember(true);
    }
  }, []);

  // 아이디 저장 버튼 클릭  핸들러
  const onClickRememberId = useCallback(() => {
    const checked = !checkedRemember;
    setCheckedRemember((prev) => !prev);
    if (!checked) {
      removeCookie('rememberId');
    }
  }, [checkedRemember, id]);

  // 경고문구 설정
  const setWarning = useCallback((message: string) => {
    setIsWarning(true);
    setWarningMessage(message);
  }, []);

  // 유효성 검사
  const validateForm = useCallback(() => {
    if (isEmpty(id.trim())) {
      setWarning(t('message.message2'));
      return false;
    }
    if (isEmpty(password.trim())) {
      setWarning(t('message.message3'));
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
        if (checkedRemember) {
          // 아이디 저장하는 경우 로그인한 아이디 저장
          setCookie('rememberId', id, { maxAge: 2000 });
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
          <LoginTitleDiv>{t('login')}</LoginTitleDiv>
          <LoginForm>
            {isWarning && (
              <WarningMessageDiv>{warningMessage}</WarningMessageDiv>
            )}
            <InputWrapper>
              <div>
                <IoMdMail size="21" />
              </div>
              <input
                placeholder={t('id')}
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
                placeholder={t('password')}
                type="password"
                value={password}
                onChange={onChangePassword}
                onKeyDown={onKeyDownLoginForm}
              />
            </InputWrapper>
            <RememberIdDiv onClick={onClickRememberId}>
              <Checkbox checked={checkedRemember} />
              <div>&nbsp; {t('rememberId')}</div>
            </RememberIdDiv>
          </LoginForm>
          <ButtonWrapper>
            <LoginButton onClick={loginProc}> {t('login')}</LoginButton>
            <FindPasswordButton
              onClick={() => {
                setShowFindPassword(true);
              }}
            >
              {t('findPassword')}
            </FindPasswordButton>
          </ButtonWrapper>
          <JoinButton>
            {t('message.message4')}&nbsp;
            <span
              onClick={() => {
                navigate('/join');
              }}
            >
              {t('register')}
            </span>
          </JoinButton>
        </>
      )}
    </Container>
  );
}

export default LoginPopup;
