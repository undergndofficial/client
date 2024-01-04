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
  AuthForm,
  FormTitle,
  WarningMessageDiv,
  StepWrapper,
  StepDiv,
} from './style';
import Input from 'components/Input';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import useInput from 'hooks/useInput';
import useRequest from 'hooks/useRequest';
import { IFilmpeople, IUser } from 'types/db';
import { useForm } from 'react-hook-form';
import { dupCheck, signup, signupFilmpeople } from 'api/member';
import { useNavigate } from 'react-router-dom';
import { isEmpty, isNil } from 'lodash';
import FilmPersonForm from './FilmPersonForm';
import { IFilmForm, IUserForm } from 'types/form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

/**
 * 회원 가입 페이지
 */
function Join() {
  const { t } = useTranslation();
  const [filmPersonStep, setFilmPersonStep] = useState(false);
  // 기본 정보
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<IUserForm>({
    mode: 'onChange',
  });
  const passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/;
  const emailPattern = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  const phonePattern = /^(\d{2,3})(\d{3,4})(\d{4})$/;
  const [phone, setPhone] = useState(''); // 휴대폰 번호
  const [emailAuthcode, onChangeEmailAuthcode] = useInput(''); // 이메일 인증 코드
  const [phoneAuthcode, onChangePhoneAuthcode] = useInput(''); // 휴대폰 인증 코드
  const [smsAgree, setSmsAgree] = useState(false); // sms 수신 동의
  const [emailAgree, setEmailAgree] = useState(false); // 이메일 수신 동의
  // 인증 인풋 보여줄 지 여부
  const [showEmailAuthForm, setShowEmailAuthForm] = useState(false);
  const [showPhoneAuthForm, setShowPhoneAuthForm] = useState(false);
  // 인증 되었는지 여부 -> 일단 안쓸거라 True로
  const [doneEmailAuth, setDoneEmailAuth] = useState(true);
  const [donePhoneAuth, setDonePhoneAuth] = useState(true);
  // 영화인인지 여부
  const [filmPerson, setFilmPerson] = useState(false);
  // 영화인 정보
  const [filmPersonInfo, setFilmPersonInfo] = useState<IFilmForm>({
    enName: '',
    photo: null,
    nation: '',
    gender: 'E',
    birthDate: null,
    debutDate: null,
    belong: '',
    notes: '',
  });
  // 영화인 에러 정보
  const [filmPersonError, setFilmPersonError] = useState<{
    [key: string]: { error: boolean; message?: string };
  }>({
    enName: { error: false },
    nation: { error: false },
    birthDate: { error: false },
  });
  // 유효성 검증 된 사용자 기본 정보
  const [userBasicInfo, setUserBasicInfo] = useState<IUser | null>(null);

  const navigate = useNavigate();

  // 회원가입 요청
  const requestJoin = useRequest<{ memSeq: number }>(signup);
  // 영화인 등록 요청
  const requestFilmPeople = useRequest<boolean>(signupFilmpeople);
  // 중복 체크
  const fetchDupCheck = useRequest<'duplicated' | 'not duplicated'>(dupCheck);

  // 휴대폰 번호 변경에 따라 xxx-xxxx-xxxx 형태로 바꿔주기
  const onChangePhone = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let formattedPhone = e.target.value;
      if (formattedPhone.length > 13) return;
      formattedPhone = formattedPhone
        .replace(/[^0-9]/g, '')
        .replace(phonePattern, `$1-$2-$3`);
      setPhone(formattedPhone);
    },
    [phone],
  );

  // 이메일 인증 받기 버튼 클릭 핸들러
  const onClickSendEmailAuthcode = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      // 이메일이 유효하지 않으면 인증 안보냄
      const email = watch('email');
      if (!email || !emailPattern.test(email)) {
        setShowEmailAuthForm(false);
        return;
      }
      // 이메일이 중복될 경우 오류 메시지 설정
      const duplicated = await fetchDupCheck({ ctype: 'email', value: email });
      if (duplicated === 'duplicated') {
        setError('email', {
          type: 'duplicated',
          message: t('message.message16'),
        });
        setShowEmailAuthForm(false);
        return;
      }
      setShowEmailAuthForm(true);
    },
    [],
  );

  // 이메일 인증 버튼 클릭 핸들러
  const onClickEmailAuthcode = useCallback(() => {
    if (doneEmailAuth) return;
    setDoneEmailAuth(true);
  }, []);

  // 휴대폰 인증 받기 버튼 클릭 핸들러
  const onClickSendPhoneAuthcode = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      // 휴대폰 번호가 유효하지 않으면 인증 안보냄
      const phone = watch('phone').replace(/[^0-9]/g, '');
      if (!phone || !phonePattern.test(phone)) {
        setShowPhoneAuthForm(false);
        return;
      }
      // 휴대폰 번호가 중복될 경우 오류 메시지 설정
      const duplicated = await fetchDupCheck({ ctype: 'phone', value: phone });
      if (duplicated === 'duplicated') {
        setError('phone', {
          type: 'duplicated',
          message: t('message.message17'),
        });
        setShowPhoneAuthForm(false);
        return;
      }
      setShowPhoneAuthForm(true);
    },
    [],
  );

  // 휴대폰 인증 버튼 클릭 핸들러
  const onClickPhoneAuthcode = useCallback(() => {
    if (donePhoneAuth) return;
    setDonePhoneAuth(true);
  }, []);

  // 다음 버튼 클릭 시 기본 정보 폼 유효성 검사
  const onClickNextButton = async (data: IUserForm) => {
    let errorFlag = false;
    // 아이디가 중복될 경우, 인증이 되지 않았을 경우 오류 메시지 설정
    const duplicated = await fetchDupCheck({ ctype: 'id', value: data.id });
    if (duplicated === 'duplicated') {
      setError('id', {
        type: 'duplicated',
        message: t('message.message18'),
      });
      errorFlag = true;
    }
    if (!donePhoneAuth || (!isEmpty(data.email) && !doneEmailAuth)) {
      errorFlag = true;
    }
    if (errorFlag) return;
    setFilmPersonStep(true);
    const userInfo: IUser = {
      memId: data.id,
      memName: data.name,
      memPass: data.password,
      memEmail: data.email,
      memPhone: data.phone.replace(/[^0-9]/g, ''),
      agreeUasges: false,
      agreePrivacy: false,
      agreeSms: smsAgree,
      agreeMailing: emailAgree,
    };
    setUserBasicInfo(userInfo);
  };

  // 영화인 정보 에러 메시지 설정
  const setFilmPersonErrorInfo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (value: any, key: string, message?: string) => {
      if (isNil(value) || value === '') {
        setFilmPersonError((prev) => ({
          ...prev,
          [key]: { error: true, message },
        }));
        return false;
      }
      setFilmPersonError((prev) => ({
        ...prev,
        [key]: { error: false },
      }));
      return true;
    },
    [],
  );

  // 영화인 정보 유효성 검증. 필수 요소가 빈칸인지만 확인
  const validateFilmPerson = useCallback(() => {
    let flag = true;
    if (
      !setFilmPersonErrorInfo(
        filmPersonInfo.enName,
        'enName',
        t('message.message19'),
      )
    ) {
      flag = false;
    }
    if (
      !setFilmPersonErrorInfo(
        filmPersonInfo.nation,
        'nation',
        t('message.message20'),
      )
    ) {
      flag = false;
    }
    if (
      !setFilmPersonErrorInfo(
        filmPersonInfo.birthDate,
        'birthDate',
        t('message.message21'),
      )
    ) {
      flag = false;
    }
    return flag;
  }, [filmPersonInfo]);

  // 회원가입
  const joinProc = () => {
    if (filmPerson && !validateFilmPerson()) return;
    requestJoin(userBasicInfo)
      .then((data) => {
        if (filmPerson) {
          const { memSeq } = data;
          const filmPeople: Omit<IFilmpeople, 'fpSeq'> = {
            fpKoName: userBasicInfo?.memName as string,
            fpEnName: filmPersonInfo.enName,
            fpPhoto: filmPersonInfo.photo as File,
            fpNationalitySeq: filmPersonInfo.nation,
            fpSex: filmPersonInfo.gender,
            fpBirthYear: filmPersonInfo.birthDate?.getFullYear() as number,
            fpDeparts: filmPersonInfo.belong,
            fpRemarks: filmPersonInfo.notes,
            memSeq: memSeq,
          };
          const formData = new FormData();
          formData.append('mem_seq', filmPeople.memSeq.toString());
          formData.append('fp_ko_name', filmPeople.fpKoName);
          formData.append('fp_en_name', filmPeople.fpEnName);
          formData.append('fp_nationality_seq', filmPeople.fpNationalitySeq);
          formData.append('fp_sex', filmPeople.fpSex);
          formData.append('fp_birth_year', filmPeople.fpBirthYear.toString());
          if (filmPeople.fpPhoto) {
            formData.append('fp_photo', filmPeople.fpPhoto);
          }
          if (!isEmpty(filmPeople.fpDeparts)) {
            formData.append('fp_departs', filmPeople.fpDeparts);
          }
          if (!isEmpty(filmPeople.fpRemarks)) {
            formData.append('fp_remarks', filmPeople.fpRemarks);
          }
          requestFilmPeople(formData)
            .then(() => {
              toast.success(t('message.message22'));
              navigate('/');
            })
            .catch(() => {
              toast.error('회원가입에 실패하였습니다.');
            });
        } else {
          toast.success(t('message.message22'));
          navigate('/');
        }
      })
      .catch((e) => {
        if (e.code === 'err_mem_009') {
          toast.error(e.message);
        }
        toast.error('회원가입에 실패하였습니다.');
      });
  };

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>{t('register')}</TitleDiv>
          <StepWrapper>
            <StepDiv selected={!filmPersonStep}>
              {t('basicInfoRegister')}
            </StepDiv>
            <StepDiv selected={filmPersonStep}>{t('filmInfoRegister')}</StepDiv>
          </StepWrapper>
          {/* 기본 정보  */}
          {!filmPersonStep ? (
            <JoinForm>
              <FormTitle>
                {t('basicInfo')} {t('enroll')}
              </FormTitle>
              <FormItemDiv>
                <Label required>{t('id')}</Label>
                <>
                  <Input
                    placeholder={t('message.message23')}
                    {...register('id', {
                      required: t('message.message23'),
                      // pattern: {
                      //   value: idPattern,
                      //   message: '아이디 형식이 올바르지 않습니다.',
                      // },
                    })}
                  />
                </>
                {errors.id && (
                  <WarningMessageDiv>{errors.id.message}</WarningMessageDiv>
                )}
              </FormItemDiv>
              <FormItemDiv>
                <Label required>{t('password')}</Label>
                <Input
                  placeholder={t('message.message24')}
                  type="password"
                  {...register('password', {
                    required: t('message.message25'),
                    pattern: {
                      value: passwordPattern,
                      message: t('message.message26'),
                    },
                  })}
                />
                {errors.password && (
                  <WarningMessageDiv>
                    {errors.password.message}
                  </WarningMessageDiv>
                )}
              </FormItemDiv>
              <FormItemDiv>
                <Label required>{t('passwordConfirm')}</Label>
                <Input
                  placeholder={t('message.message24')}
                  type="password"
                  {...register('passwordRe', {
                    required: t('message.message27'),
                  })}
                />
                {errors.passwordRe && (
                  <WarningMessageDiv>
                    {errors.passwordRe.message}
                  </WarningMessageDiv>
                )}
                {/* 비밀번호가 형식에 맞고 비밀번호 재입력과 일치하면 일치 문구 표출 */}
                {!errors.passwordRe &&
                  passwordPattern.test(watch('password')) &&
                  (watch('password') === watch('passwordRe') ? (
                    <WarningMessageDiv correct>
                      {t('message.message28')}
                    </WarningMessageDiv>
                  ) : (
                    <WarningMessageDiv>
                      {t('message.message29')}
                    </WarningMessageDiv>
                  ))}
              </FormItemDiv>
              <FormItemDiv>
                <Label required>{t('name')}</Label>
                <Input
                  placeholder={t('message.message30')}
                  {...register('name', {
                    required: t('message.message30'),
                  })}
                />
                {errors.name && (
                  <WarningMessageDiv>{errors.name.message}</WarningMessageDiv>
                )}
              </FormItemDiv>
              <FormItemDiv>
                <Label required>{t('phone')}</Label>
                <>
                  <Input
                    placeholder={t('message.message31')}
                    value={phone}
                    {...register('phone', {
                      required: t('message.message31'),
                      validate: {
                        check: (value) => {
                          if (!phonePattern.test(value.replace(/[^0-9]/g, '')))
                            return t('message.message32');
                        },
                      },
                      onChange: onChangePhone,
                    })}
                    disabled={showPhoneAuthForm}
                  />
                  {/* <Button
                    onClick={onClickSendPhoneAuthcode}
                    disabled={showPhoneAuthForm}
                  >
                    {t('sendAuthCode')}
                  </Button> */}
                </>
                {errors.phone && (
                  <WarningMessageDiv>{errors.phone.message}</WarningMessageDiv>
                )}
              </FormItemDiv>
              {showPhoneAuthForm && (
                <>
                  <FormItemDiv>
                    <AuthForm>
                      <Input
                        placeholder={t('message.message33')}
                        width="50%"
                        value={phoneAuthcode}
                        onChange={onChangePhoneAuthcode}
                        disabled={donePhoneAuth}
                      />
                      <AuthButton onClick={onClickPhoneAuthcode}>
                        {t('auth')}
                      </AuthButton>
                    </AuthForm>
                    <WarningMessageDiv correct={donePhoneAuth}>
                      {donePhoneAuth
                        ? t('message.message34')
                        : t('message.message35')}
                    </WarningMessageDiv>
                  </FormItemDiv>
                </>
              )}
              <FormItemDiv>
                <Label>{t('email')}</Label>
                <>
                  <Input
                    placeholder="example@undergnd.com"
                    {...register('email', {
                      pattern: {
                        value: emailPattern,
                        message: t('message.message36'),
                      },
                    })}
                    disabled={showEmailAuthForm}
                  />
                  {/* <Button
                    onClick={onClickSendEmailAuthcode}
                    disabled={showEmailAuthForm}
                  >
                    {t('sendAuthCode')}
                  </Button> */}
                </>
                {errors.email && (
                  <WarningMessageDiv>{errors.email.message}</WarningMessageDiv>
                )}
              </FormItemDiv>
              {showEmailAuthForm && (
                <>
                  <FormItemDiv>
                    <AuthForm>
                      <Input
                        placeholder={t('message.message33')}
                        width="50%"
                        value={emailAuthcode}
                        onChange={onChangeEmailAuthcode}
                        disabled={doneEmailAuth}
                      />
                      <AuthButton onClick={onClickEmailAuthcode}>
                        {t('auth')}
                      </AuthButton>
                    </AuthForm>
                    <WarningMessageDiv correct={doneEmailAuth}>
                      {doneEmailAuth
                        ? t('message.message34')
                        : t('message.message35')}
                    </WarningMessageDiv>
                  </FormItemDiv>
                </>
              )}
              <FormItemDiv>
                <Label>{t('incomingAgree')}</Label>
                <FlexWrapper gap="2">
                  <FlexWrapper
                    onClick={() => {
                      setSmsAgree((prev) => !prev);
                    }}
                  >
                    <Checkbox checked={smsAgree} />
                    SMS {t('incomingAgree')}
                  </FlexWrapper>
                  <FlexWrapper
                    onClick={() => {
                      setEmailAgree((prev) => !prev);
                    }}
                  >
                    <Checkbox checked={emailAgree} />
                    e-mail {t('incomingAgree')}
                  </FlexWrapper>
                  {/* <TermsButton>{t('termCheck')}</TermsButton> */}
                </FlexWrapper>
              </FormItemDiv>
            </JoinForm>
          ) : (
            /*영화인 정보 */
            <FilmPersonForm
              filmPersonInfo={filmPersonInfo}
              setFilmPersonInfo={setFilmPersonInfo}
              filmPerson={filmPerson}
              setFilmPerson={setFilmPerson}
              filmPersonError={filmPersonError}
              setFilmPersonErrorInfo={setFilmPersonErrorInfo}
            />
          )}
          {!filmPersonStep ? (
            <Button width="8rem" onClick={handleSubmit(onClickNextButton)}>
              {t('next')}
            </Button>
          ) : (
            <FlexWrapper gap="1.5">
              <Button
                width="8rem"
                onClick={() => {
                  setFilmPersonStep(false);
                }}
              >
                {t('prev')}
              </Button>
              <Button width="8rem" onClick={joinProc}>
                {t('register')}
              </Button>
            </FlexWrapper>
          )}
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Join;
