import React, { useCallback, useEffect, useRef, useState } from 'react';
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
  Textarea,
  WarningMessageDiv,
  PreviewImageWrapper,
} from './style';
import Input from 'components/Input';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import IconButton from 'components/IconButton';
import Select from 'components/Select';
import useInput from 'hooks/useInput';
import useFetch from 'hooks/useFetch';
import { getNationList } from 'api/common';
import { NationType } from 'types/user';
import { ActionMeta, SingleValue } from 'react-select';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';

interface UserFormType {
  email: string;
  password: string;
  passwordRe: string;
  phone: string;
}

/**
 * 회원 가입 페이지
 */
function Join() {
  // 기본 정보
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormType>({
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
  // 영화인 정보
  const [nation, setNation] = useState(''); // 국적
  const [gender, setGender] = useState<'woman' | 'man' | 'etc' | ''>('etc'); // 성별
  const [belong, onChangeBelong] = useInput(''); // 소속
  const [notes, onChangeNotes] = useInput(''); // 특이 사항
  // 인증 인풋 보여줄 지 여부
  const [showEmailAuthForm, setShowEmailAuthForm] = useState(false);
  const [showPhoneAuthForm, setShowPhoneAuthForm] = useState(false);
  // 인증 되었는지 여부
  const [doneEmailAuth, setDoneEmailAuth] = useState(false);
  const [donePhoneAuth, setDonePhoneAuth] = useState(false);

  // 국가 목록
  const [nationList, fetchNationList] = useFetch<NationType[]>(
    getNationList,
    [],
  );
  useEffect(() => {
    fetchNationList({});
  }, []);

  // 국가 목록 옵션으로 가공
  const [nationOptions, setNationOptions] = useState<
    { label: string; value: string }[]
  >([]);
  useEffect(() => {
    const options = nationList.map((n) => ({
      label: n.nation,
      value: n.nationality_seq,
    }));
    setNationOptions(options);
  }, [nationList]);

  // 국가 변경 핸들러
  const onChangeNation = useCallback(
    (
      newValue: SingleValue<{ label: string; value: string }>,
      actionMeta: ActionMeta<{ label: string; value: string }>,
    ) => {
      if (actionMeta.action === 'select-option') {
        setNation(newValue?.value as string);
      } else if (actionMeta.action === 'clear') {
        setNation('');
      }
    },
    [],
  );

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
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      // 이메일이 유효하지 않으면 인증 안보냄
      const email = watch('email');
      if (!email || !emailPattern.test(email)) {
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
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      // 휴대폰 번호가 유효하지 않으면 인증 안보냄
      const phone = watch('phone').replace(/[^0-9]/g, '');
      if (!phone || !phonePattern.test(phone)) {
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

  // 회원가입
  const joinProc = (data: UserFormType) => {
    console.log(data, nation);
  };

  // 파일 업로드 버튼 클릭 핸들러
  const fileInput = useRef<HTMLInputElement | null>(null);
  const clickUploadButton = useCallback(() => {
    fileInput.current?.click();
  }, []);

  // 영화인 프로필 이미지 관련 임시 코드
  const [imageSrc, setImageSrc] = useState('');
  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
        }
        resolve();
      };
    });
  };

  return (
    <Layout>
      <PageContent>
        <Container>
          <TitleDiv>회원가입</TitleDiv>
          {/* 기본 정보  */}
          <JoinForm>
            <FormTitle>기본 정보 등록</FormTitle>
            <FormItemDiv>
              <Label>이메일</Label>
              <>
                <Input
                  placeholder="E-mail 입력"
                  {...register('email', {
                    required: '이메일을 입력해주세요.',
                    pattern: {
                      value: emailPattern,
                      message: '이메일 형식이 올바르지 않습니다.',
                    },
                  })}
                  disabled={doneEmailAuth}
                />
                <Button
                  onClick={onClickSendEmailAuthcode}
                  disabled={doneEmailAuth}
                >
                  인증번호 받기
                </Button>
              </>
            </FormItemDiv>
            {errors.email && (
              <WarningMessageDiv>{errors.email.message}</WarningMessageDiv>
            )}
            {showEmailAuthForm && (
              <>
                <FormItemDiv>
                  <AuthForm>
                    <Input
                      placeholder="인증번호 입력"
                      width="50%"
                      value={emailAuthcode}
                      onChange={onChangeEmailAuthcode}
                      disabled={doneEmailAuth}
                    />
                    <AuthButton onClick={onClickEmailAuthcode}>인증</AuthButton>
                  </AuthForm>
                </FormItemDiv>
                <WarningMessageDiv correct={doneEmailAuth}>
                  {doneEmailAuth
                    ? '인증이 완료되었습니다.'
                    : '인증을 완료해주세요.'}
                </WarningMessageDiv>
              </>
            )}
            <FormItemDiv>
              <Label>비밀번호</Label>
              <Input
                placeholder="8자~16자, 문자, 숫자, 특수문자 포함"
                type="password"
                {...register('password', {
                  required: '비밀번호를 입력해주세요.',
                  pattern: {
                    value: passwordPattern,
                    message: '비밀번호 형식이 올바르지 않습니다.',
                  },
                })}
              />
            </FormItemDiv>
            {errors.password && (
              <WarningMessageDiv>{errors.password.message}</WarningMessageDiv>
            )}
            <FormItemDiv>
              <Label>비밀번호 확인</Label>
              <Input
                placeholder="8자~16자, 문자, 숫자, 특수문자 포함"
                type="password"
                {...register('passwordRe', {
                  required: '비밀번호를 한번 더 입력해주세요.',
                  validate: {
                    check: (value) => {
                      if (watch('password') !== value) {
                        return '비밀번호가 일치하지 않습니다.';
                      }
                    },
                  },
                })}
              />
            </FormItemDiv>
            {errors.passwordRe && (
              <WarningMessageDiv>{errors.passwordRe.message}</WarningMessageDiv>
            )}
            {/* 비밀번호가 형식에 맞고 비밀번호 재입력과 일치하면 일치 문구 표출 */}
            {passwordPattern.test(watch('password')) &&
              watch('password') === watch('passwordRe') && (
                <WarningMessageDiv correct>
                  비밀번호가 일치합니다
                </WarningMessageDiv>
              )}
            <FormItemDiv>
              <Label>연락처</Label>
              <>
                <Input
                  placeholder="전화번호 입력"
                  value={phone}
                  {...register('phone', {
                    required: '전화 번호를 입력해주세요.',
                    validate: {
                      check: (value) => {
                        if (!phonePattern.test(value.replace(/[^0-9]/g, '')))
                          return '전화번호 형식이 올바르지 않습니다.';
                      },
                    },
                    onChange: onChangePhone,
                  })}
                  disabled={donePhoneAuth}
                />
                <Button
                  onClick={onClickSendPhoneAuthcode}
                  disabled={donePhoneAuth}
                >
                  인증번호 받기
                </Button>
              </>
            </FormItemDiv>
            {errors.phone && (
              <WarningMessageDiv>{errors.phone.message}</WarningMessageDiv>
            )}
            {showPhoneAuthForm && (
              <>
                <FormItemDiv>
                  <AuthForm>
                    <Input
                      placeholder="인증번호 입력"
                      width="50%"
                      value={phoneAuthcode}
                      onChange={onChangePhoneAuthcode}
                      disabled={donePhoneAuth}
                    />
                    <AuthButton onClick={onClickPhoneAuthcode}>인증</AuthButton>
                  </AuthForm>
                </FormItemDiv>
                <WarningMessageDiv correct={donePhoneAuth}>
                  {donePhoneAuth
                    ? '인증이 완료되었습니다.'
                    : '인증을 완료해주세요.'}
                </WarningMessageDiv>
              </>
            )}
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
          {/* 영화인 정보 */}
          <JoinForm>
            <FormTitle>영화인 정보 등록</FormTitle>
            <FormItemDiv>
              <Label>프로필 사진</Label>
              <input
                type="file"
                id="image"
                accept="image/*"
                style={{ display: 'none' }}
                ref={fileInput}
                onChange={(e) => {
                  const selectedFile = e.target.files && e.target.files[0];
                  if (selectedFile) {
                    encodeFileToBase64(selectedFile);
                  }
                }}
              />
              <IconButton onClick={clickUploadButton}>
                <HiOutlinePhoto />
              </IconButton>
            </FormItemDiv>
            {imageSrc && (
              <PreviewImageWrapper>
                <img src={imageSrc} alt="preview-img" />
              </PreviewImageWrapper>
            )}
            <FormItemDiv>
              <Label>국적</Label>
              <Select
                onChange={onChangeNation}
                options={nationOptions}
                placeholder="국적 선택"
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>성별</Label>
              <FlexWrapper
                onClick={() => {
                  setGender('man');
                }}
              >
                <Checkbox checked={gender == 'man'} />남
              </FlexWrapper>
              <FlexWrapper
                onClick={() => {
                  setGender('woman');
                }}
              >
                <Checkbox checked={gender == 'woman'} />여
              </FlexWrapper>
              <FlexWrapper
                onClick={() => {
                  setGender('etc');
                }}
              >
                <Checkbox checked={gender == 'etc'} />
                기타
              </FlexWrapper>
            </FormItemDiv>
            <FormItemDiv>
              <Label>소속</Label>
              <Input
                value={belong}
                onChange={onChangeBelong}
                placeholder="소속 입력"
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label alignSelf="start">특이사항</Label>
              <Textarea
                placeholder="• 수상경력&#13;• 홍보(어필)등&#13;자유롭게 입력해주세요"
                value={notes}
                onChange={onChangeNotes}
              />
            </FormItemDiv>
          </JoinForm>
          <Button width="8rem" onClick={handleSubmit(joinProc)}>
            회원가입
          </Button>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Join;
