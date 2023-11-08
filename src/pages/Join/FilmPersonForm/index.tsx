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
import { INation } from 'types/db';
import useRequest from 'hooks/useRequest';
import useSelect from 'hooks/useSelect';
import { getSelectOptionList } from 'utils/common';
import { getNationList } from 'api/common';
import { IFilmForm } from 'types/form';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
  const { t } = useTranslation();
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
    (option) => {
      setFilmPersonInfo((prev) => ({ ...prev, nation: option.value }));
      setFilmPersonErrorInfo(option.value, 'nation', t('message.message20'));
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
        <FormTitle>{t('filmPersonRegister')}</FormTitle>
        <FlexWrapper
          onClick={() => {
            setFilmPerson((prev) => !prev);
          }}
        >
          <Checkbox checked={filmPerson} />
          {t('message.message37')}
        </FlexWrapper>
        {filmPerson && (
          <>
            <FormItemDiv>
              <Label>{t('profilePicture')}</Label>
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
                    toast.error(t('message.message38'));
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
              <Label required>{t('enName')}</Label>
              <Input
                value={filmPersonInfo.enName}
                placeholder={t('message.message19')}
                onChange={(e) => {
                  const value = e.target.value;
                  setFilmPersonInfo((prev) => ({
                    ...prev,
                    enName: value,
                  }));
                  setFilmPersonErrorInfo(
                    value,
                    'enName',
                    t('message.message19'),
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
              <Label required>{t('nation')}</Label>
              <Select
                onChange={onChangeNation}
                options={nationOptions}
                placeholder={t('selectNation')}
              />
              {filmPersonError.nation.error && (
                <WarningMessageDiv>
                  {filmPersonError.nation?.message}
                </WarningMessageDiv>
              )}
            </FormItemDiv>
            <FormItemDiv>
              <Label required>{t('gender')}</Label>
              <FlexWrapper
                onClick={() => {
                  setFilmPersonInfo((prev) => ({ ...prev, gender: 'M' }));
                }}
              >
                <Checkbox checked={filmPersonInfo.gender == 'M'} />
                {t('male')}
              </FlexWrapper>
              <FlexWrapper
                onClick={() => {
                  setFilmPersonInfo((prev) => ({ ...prev, gender: 'F' }));
                }}
              >
                <Checkbox checked={filmPersonInfo.gender == 'F'} />
                {t('female')}
              </FlexWrapper>
              <FlexWrapper
                onClick={() => {
                  setFilmPersonInfo((prev) => ({ ...prev, gender: 'E' }));
                }}
              >
                <Checkbox checked={filmPersonInfo.gender == 'E'} />
                {t('etc')}
              </FlexWrapper>
            </FormItemDiv>
            <FormItemDiv>
              <Label required> {t('birthDate')}</Label>
              <DatePicker
                selectedDate={filmPersonInfo.birthDate}
                setSelectedDate={(value) => {
                  setFilmPersonInfo((prev) => ({ ...prev, birthDate: value }));
                  setFilmPersonErrorInfo(
                    value,
                    'birthDate',
                    t('message.message39'),
                  );
                }}
                placeholder={t('selectBirthDate')}
              />
              {filmPersonError.birthDate.error && (
                <WarningMessageDiv>
                  {filmPersonError.birthDate?.message}
                </WarningMessageDiv>
              )}
            </FormItemDiv>
            <FormItemDiv>
              <Label>{t('debutDate')}</Label>
              <DatePicker
                selectedDate={filmPersonInfo.debutDate}
                setSelectedDate={(value) => {
                  setFilmPersonInfo((prev) => ({ ...prev, debutDate: value }));
                }}
                placeholder={t('selectDebutDate')}
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label>{t('belong')}</Label>
              <Input
                value={filmPersonInfo.belong}
                onChange={(e) => {
                  setFilmPersonInfo((prev) => ({
                    ...prev,
                    belong: e.target.value,
                  }));
                }}
                placeholder={t('message.message40')}
              />
            </FormItemDiv>
            <FormItemDiv>
              <Label alignSelf="start">{t('notes')}</Label>
              <Textarea
                placeholder={t('message.message41')}
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
