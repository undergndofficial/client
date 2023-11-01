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
import useRequest from 'hooks/useRequest';
import { getNationList } from 'api/common';
import { IFilmpeople, IUser } from 'types/db';
import { INation } from 'types/common';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { useForm } from 'react-hook-form';
import { dupCheck, signup, signupFilmpeople } from 'api/member';
import { useNavigate } from 'react-router-dom';
import useSelect from 'hooks/useSelect';
import { getSelectOptionList } from 'utils/common';

interface UserFormType {
  id: string;
  email: string;
  password: string;
  passwordRe: string;
  name: string;
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
    setError,
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
  // 영화인인지 여부
  const [filmPerson, setFilmPerson] = useState(false);
  // 영화인 정보
  const [photo, setPhoto] = useState<Blob | null>(null);
  const [nation, setNation] = useState(''); // 국적
  const [gender, setGender] = useState<'F' | 'M' | 'E'>('E'); // 성별
  const [enName, onChangeEnName] = useInput(''); // 영어 네임
  const [belong, onChangeBelong] = useInput(''); // 소속
  const [notes, onChangeNotes] = useInput(''); // 특이 사항
  // 인증 인풋 보여줄 지 여부
  const [showEmailAuthForm, setShowEmailAuthForm] = useState(false);
  const [showPhoneAuthForm, setShowPhoneAuthForm] = useState(false);
  // 인증 되었는지 여부
  const [doneEmailAuth, setDoneEmailAuth] = useState(false);
  const [donePhoneAuth, setDonePhoneAuth] = useState(false);

  const navigate = useNavigate();

  // 회원가입 요청
  const requestJoin = useRequest<{ memSeq: number }>(signup);
  // 영화인 등록 요청
  const requestFilmPeople = useRequest<boolean>(signupFilmpeople);
  // 중복 체크
  const fetchDupCheck = useRequest<'duplicated' | 'not duplicated'>(dupCheck);

  // 국가 목록
  const fetchNationList = useRequest<INation[]>(getNationList);
  const [nationList, setNationList] = useState<INation[]>([]);
  useEffect(() => {
    fetchNationList({}).then((data) => {
      setNationList(data);
    });
  }, []);

  // 국가 목록 옵션으로 가공
  const [nationOptions, setNationOptions, onChangeNation] =
    useSelect(setNation); // 국가 목록
  useEffect(() => {
    const optionData = nationList as unknown as { [key: string]: string }[];
    setNationOptions(
      getSelectOptionList(optionData, 'nation', 'nationalitySeq'),
    );
  }, [nationList]);

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
          message: '중복된 이메일입니다.',
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
          message: '중복된 휴대폰 번호입니다.',
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

  // 회원가입
  const joinProc = async (data: UserFormType) => {
    // 아이디가 중복될 경우 오류 메시지 설정
    const duplicated = await fetchDupCheck({ ctype: 'id', value: data.id });
    if (duplicated === 'duplicated') {
      setError('id', {
        type: 'duplicated',
        message: '중복된 아이디입니다.',
      });
      return;
    }
    const joinUser: IUser = {
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
    requestJoin(joinUser)
      .then((data) => {
        if (filmPerson) {
          const { memSeq } = data;
          const filmPeople: IFilmpeople = {
            fpKoName: enName, // TODO:수정 필요. 임시
            fpEnName: enName,
            fpPhoto: photo as File,
            fpNationalitySeq: nation,
            fpSex: gender,
            fpBirthYear: 0,
            fpDeparts: belong,
            fpRemarks: notes,
            memSeq: memSeq,
          };
          const formData = new FormData();
          formData.append('fp_ko_name', filmPeople.fpKoName);
          formData.append('fp_en_name', filmPeople.fpEnName);
          formData.append('photo', filmPeople.fpPhoto);
          formData.append('fp_nationality_seq', filmPeople.fpNationalitySeq);
          formData.append('fp_sex', filmPeople.fpSex);
          formData.append('fp_birth_year', filmPeople.fpBirthYear.toString());
          formData.append('fp_departs', filmPeople.fpDeparts);
          formData.append('fp_remarks', filmPeople.fpRemarks);
          formData.append('mem_seq', filmPeople.memSeq.toString());
          requestFilmPeople(formData)
            .then(() => {
              alert('회원가입 되었습니다.');
              navigate('/');
            })
            .catch((e) => {
              console.error(e.message);
            });
        } else {
          navigate('/');
        }
      })
      .catch((e) => {
        console.error(e.message);
      });
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
    setPhoto(fileBlob);

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
              <Label>아이디</Label>
              <>
                <Input
                  placeholder="아이디를 입력해주세요"
                  {...register('id', {
                    required: '아이디를 입력해주세요.',
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
            </FormItemDiv>{' '}
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
              {errors.password && (
                <WarningMessageDiv>{errors.password.message}</WarningMessageDiv>
              )}
            </FormItemDiv>
            <FormItemDiv>
              <Label>비밀번호 확인</Label>
              <Input
                placeholder="8자~16자, 문자, 숫자, 특수문자 포함"
                type="password"
                {...register('passwordRe', {
                  required: '비밀번호를 한번 더 입력해주세요.',
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
                    비밀번호가 일치합니다
                  </WarningMessageDiv>
                ) : (
                  <WarningMessageDiv>
                    비밀번호가 일치하지 않습니다
                  </WarningMessageDiv>
                ))}
            </FormItemDiv>
            <FormItemDiv>
              <Label>이름</Label>
              <Input
                placeholder="이름 입력"
                {...register('name', {
                  required: '이름을 입력해주세요',
                })}
              />
              {errors.name && (
                <WarningMessageDiv>{errors.name.message}</WarningMessageDiv>
              )}
            </FormItemDiv>
            <FormItemDiv>
              <Label>전화번호</Label>
              <>
                <Input
                  placeholder="전화번호를 입력해주세요"
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
              {errors.phone && (
                <WarningMessageDiv>{errors.phone.message}</WarningMessageDiv>
              )}
            </FormItemDiv>
            {showPhoneAuthForm && (
              <>
                <FormItemDiv>
                  <AuthForm>
                    <Input
                      placeholder="인증번호를 입력해주세요"
                      width="50%"
                      value={phoneAuthcode}
                      onChange={onChangePhoneAuthcode}
                      disabled={donePhoneAuth}
                    />
                    <AuthButton onClick={onClickPhoneAuthcode}>인증</AuthButton>
                  </AuthForm>
                  <WarningMessageDiv correct={donePhoneAuth}>
                    {donePhoneAuth
                      ? '인증이 완료되었습니다.'
                      : '인증을 완료해주세요.'}
                  </WarningMessageDiv>
                </FormItemDiv>
              </>
            )}
            <FormItemDiv>
              <Label>이메일</Label>
              <>
                <Input
                  placeholder="example@undergnd.com"
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
              {errors.email && (
                <WarningMessageDiv>{errors.email.message}</WarningMessageDiv>
              )}
            </FormItemDiv>
            {showEmailAuthForm && (
              <>
                <FormItemDiv>
                  <AuthForm>
                    <Input
                      placeholder="인증번호를 입력해주세요"
                      width="50%"
                      value={emailAuthcode}
                      onChange={onChangeEmailAuthcode}
                      disabled={doneEmailAuth}
                    />
                    <AuthButton onClick={onClickEmailAuthcode}>인증</AuthButton>
                  </AuthForm>
                  <WarningMessageDiv correct={doneEmailAuth}>
                    {doneEmailAuth
                      ? '인증이 완료되었습니다.'
                      : '인증을 완료해주세요.'}
                  </WarningMessageDiv>
                </FormItemDiv>
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
            <FormItemDiv>
              <Label>추가 정보</Label>
              <FlexWrapper
                onClick={() => {
                  setFilmPerson((prev) => !prev);
                }}
              >
                <Checkbox checked={filmPerson} />
                영화계 종사자이신가요?
              </FlexWrapper>
            </FormItemDiv>
          </JoinForm>
          {/* 영화인 정보 */}
          {filmPerson && (
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
                    if (
                      selectedFile?.type == 'image/png' ||
                      selectedFile?.type == 'image/jpeg' ||
                      selectedFile?.type == 'image/jpg'
                    ) {
                      encodeFileToBase64(selectedFile);
                    } else {
                      alert('png, jpg, jpeg 파일만 업로드할 수 있습니다.');
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
                <Label>영문이름</Label>
                <Input
                  value={enName}
                  onChange={onChangeEnName}
                  placeholder="영문이름 입력"
                />
              </FormItemDiv>
              <FormItemDiv>
                <Label>성별</Label>
                <FlexWrapper
                  onClick={() => {
                    setGender('M');
                  }}
                >
                  <Checkbox checked={gender == 'M'} />남
                </FlexWrapper>
                <FlexWrapper
                  onClick={() => {
                    setGender('F');
                  }}
                >
                  <Checkbox checked={gender == 'F'} />여
                </FlexWrapper>
                <FlexWrapper
                  onClick={() => {
                    setGender('E');
                  }}
                >
                  <Checkbox checked={gender == 'E'} />
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
          )}
          <Button width="8rem" onClick={handleSubmit(joinProc)}>
            회원가입
          </Button>
        </Container>
      </PageContent>
    </Layout>
  );
}

export default Join;
