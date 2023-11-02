import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlexWrapper,
  FormItemDiv,
  FormTitle,
  JoinForm,
  Label,
  PreviewImageWrapper,
  Textarea,
  WarningMessageDiv,
} from '../style';
import IconButton from 'components/IconButton';
import Input from 'components/Input';
import Select from 'components/Select';
import Checkbox from 'components/Checkbox';
import DatePicker from 'components/DatePicker';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { INation } from 'types/common';
import useRequest from 'hooks/useRequest';
import useSelect from 'hooks/useSelect';
import { getSelectOptionList } from 'utils/common';
import { getNationList } from 'api/common';
import { IFilmForm } from 'types/join';
import { isEmpty, isNil } from 'lodash';

/**
 * 영화인 등록 폼
 */
function FilmPersonForm({
  filmPersonInfo,
  setFilmPersonInfo,
  filmPerson,
  setFilmPerson,
  filmPersonError,
  setFilmPersonErrorInfo,
}: {
  filmPersonInfo: IFilmForm;
  setFilmPersonInfo: React.Dispatch<React.SetStateAction<IFilmForm>>;
  filmPerson: boolean;
  setFilmPerson: React.Dispatch<React.SetStateAction<boolean>>;
  filmPersonError: { [key: string]: { error: boolean; message?: string } };
  setFilmPersonErrorInfo: (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any,
    key: string,
    message?: string,
  ) => boolean;
}) {
  // 국가 목록
  const fetchNationList = useRequest<INation[]>(getNationList);
  const [nationList, setNationList] = useState<INation[]>([]);
  useEffect(() => {
    fetchNationList({}).then((data) => {
      setNationList(data);
    });
  }, []);

  // 국가 목록 옵션으로 가공
  const [nationOptions, setNationOptions, onChangeNation] = useSelect(
    (value) => {
      setFilmPersonInfo((prev) => ({ ...prev, nation: value }));
      setFilmPersonErrorInfo(value, 'nation', '국가를 선택해주세요.');
    },
  ); // 국가 목록
  useEffect(() => {
    const optionData = nationList as unknown as { [key: string]: string }[];
    setNationOptions(
      getSelectOptionList(optionData, 'nation', 'nationalitySeq'),
    );
  }, [nationList]);

  // 영화인 프로필 이미지 관련 임시 코드
  const [imageSrc, setImageSrc] = useState('');
  const encodeFileToBase64 = (fileBlob: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    setFilmPersonInfo((prev) => ({ ...prev, photo: fileBlob }));

    return new Promise<void>((resolve) => {
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImageSrc(reader.result);
        }
        resolve();
      };
    });
  };

  // 파일 업로드 버튼 클릭 핸들러
  const fileInput = useRef<HTMLInputElement | null>(null);
  const clickUploadButton = useCallback(() => {
    fileInput.current?.click();
  }, []);

  return (
    <>
      <JoinForm>
        <FormTitle>영화인 정보 등록</FormTitle>
        <FlexWrapper
          onClick={() => {
            setFilmPerson((prev) => !prev);
          }}
        >
          <Checkbox checked={filmPerson} />
          영화계 종사자이신가요?
        </FlexWrapper>
        {filmPerson && (
          <>
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
              <Label required>영문이름</Label>
              <Input
                value={filmPersonInfo.enName}
                placeholder="영문이름 입력"
                onChange={(e) => {
                  const value = e.target.value;
                  setFilmPersonInfo((prev) => ({
                    ...prev,
                    enName: value,
                  }));
                  setFilmPersonErrorInfo(
                    value,
                    'enName',
                    '영문 이름을 입력해주세요.',
                  );
                }}
              />
              {filmPersonError.enName.error && (
                <WarningMessageDiv>
                  {filmPersonError.enName?.message}
                </WarningMessageDiv>
              )}
            </FormItemDiv>
            <FormItemDiv>
              <Label required>국적</Label>
              <Select
                onChange={onChangeNation}
                options={nationOptions}
                placeholder="국적 선택"
              />
              {filmPersonError.nation.error && (
                <WarningMessageDiv>
                  {filmPersonError.nation?.message}
                </WarningMessageDiv>
              )}
            </FormItemDiv>
            <FormItemDiv>
              <Label required>성별</Label>
              <FlexWrapper
                onClick={() => {
                  setFilmPersonInfo((prev) => ({ ...prev, gender: 'M' }));
                }}
              >
                <Checkbox checked={filmPersonInfo.gender == 'M'} />남
              </FlexWrapper>
              <FlexWrapper
                onClick={() => {
                  setFilmPersonInfo((prev) => ({ ...prev, gender: 'F' }));
                }}
              >
                <Checkbox checked={filmPersonInfo.gender == 'F'} />여
              </FlexWrapper>
              <FlexWrapper
                onClick={() => {
                  setFilmPersonInfo((prev) => ({ ...prev, gender: 'E' }));
                }}
              >
                <Checkbox checked={filmPersonInfo.gender == 'E'} />
                기타
              </FlexWrapper>
            </FormItemDiv>
            <FormItemDiv>
              <Label required>생년월일</Label>
              <DatePicker
                selectedDate={filmPersonInfo.birthDate}
                setSelectedDate={(value) => {
                  setFilmPersonInfo((prev) => ({ ...prev, birthDate: value }));
                  setFilmPersonErrorInfo(
                    value,
                    'birthDate',
                    '생년월일을 선택해주세요.',
                  );
                }}
                placeholder="생년월일 선택"
              />
              {filmPersonError.birthDate.error && (
                <WarningMessageDiv>
                  {filmPersonError.birthDate?.message}
                </WarningMessageDiv>
              )}
            </FormItemDiv>
            <FormItemDiv>
              <Label>데뷔일</Label>
              <DatePicker
                selectedDate={filmPersonInfo.debutDate}
                setSelectedDate={(value) => {
                  setFilmPersonInfo((prev) => ({ ...prev, debutDate: value }));
                }}
                placeholder="데뷔일 선택"
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>소속</Label>
              <Input
                value={filmPersonInfo.belong}
                onChange={(e) => {
                  setFilmPersonInfo((prev) => ({
                    ...prev,
                    belong: e.target.value,
                  }));
                }}
                placeholder="소속 입력"
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label alignSelf="start">특이사항</Label>
              <Textarea
                placeholder="• 수상경력&#13;• 홍보(어필)등&#13;자유롭게 입력해주세요"
                value={filmPersonInfo.notes}
                onChange={(e) => {
                  setFilmPersonInfo((prev) => ({
                    ...prev,
                    notes: e.target.value,
                  }));
                }}
              />
            </FormItemDiv>
          </>
        )}
      </JoinForm>
    </>
  );
}

export default FilmPersonForm;
