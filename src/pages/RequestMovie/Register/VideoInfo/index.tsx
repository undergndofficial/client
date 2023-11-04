/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlinePhoto } from 'react-icons/hi2';
import { BiSolidCameraMovie } from 'react-icons/bi';
import IconButton from 'components/IconButton';
import useRequest from 'hooks/useRequest';
import { IColoration, ILang, IScreenRatio } from 'types/common';
import { BsCardText } from 'react-icons/bs';
import {
  getColorationList,
  getLanguageList,
  getScreenRatioList,
} from 'api/common';
import Checkbox from 'components/Checkbox';
import { getSelectOptionList } from 'utils/common';
import useSelect from 'hooks/useSelect';
import Select from 'components/Select';
import {
  Form,
  FormItemDiv,
  Label,
  CheckboxWrapper,
  FlexWrapper,
  FormTitle,
  ButtonWrapper,
} from '../style';
import Button from 'components/Button';
import { isEmpty } from 'lodash';
import { SubtitleDiv, SubtitleListDiv } from './style';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { IRegisterProp } from 'types/props';

function VideoInfo() {
  const { props }: { props: IRegisterProp } = useOutletContext();
  const navigate = useNavigate();
  const [screenRatio, setScreenRatio] = useState(0);
  const [coloration, setColoration] = useState(0);
  const [subtitleList, setSubTitleList] = useState<
    {
      subtitlefile: File;
      lang: string;
      langTxt: string;
    }[]
  >([]);
  const [lang, setLang] = useState(''); // 자막 언어
  const [subtitlefile, setSubtitlefile] = useState<File | null>(null); // 자막 파일
  const [coverFile, setCoverFile] = useState<File | null>(null); // 썸네일 이미지
  const [videoFile, setVideoFile] = useState<File | null>(null); // 영화 파일
  const [screenRatioList, setScreenRatioList] = useState<IScreenRatio[]>([]); // 화면비
  const [colorationList, setColorationList] = useState<IColoration[]>([]); // 색채
  // 화면비, 색채, 언어 목록 로드
  const requestScreenRatioList = useRequest<IScreenRatio[]>(getScreenRatioList);
  const requestColorationList = useRequest<IColoration[]>(getColorationList);
  const [langOptions, setLangOptions, onChangeLang] = useSelect(setLang); // 사용 언어 목록
  const requestLangList = useRequest<ILang[]>(getLanguageList);
  useEffect(() => {
    // 화면비 목록
    requestScreenRatioList().then((data) => {
      setScreenRatioList(data);
    });
    // 색채 목록
    requestColorationList().then((data) => {
      setColorationList(data);
    });
    // 언어 목록
    requestLangList({}).then((data) => {
      const optionData = data as unknown as { [key: string]: string }[];
      setLangOptions(getSelectOptionList(optionData, 'langName', 'langCode'));
    });
  }, []);

  // 썸네일 파일 업로드 버튼 클릭 핸들러
  const coverInput = useRef<HTMLInputElement | null>(null);
  const clickCoverUploadButton = useCallback(() => {
    coverInput.current?.click();
  }, []);
  // 영화 파일 업로드 버튼 클릭 핸들러
  const videoInput = useRef<HTMLInputElement | null>(null);
  const clickVideoUploadButton = useCallback(() => {
    videoInput.current?.click();
  }, []);
  // 자막 파일 업로드 버튼 클릭 핸들러
  const subtitleInput = useRef<HTMLInputElement | null>(null);
  const clickSubtitleUploadButton = useCallback(() => {
    subtitleInput.current?.click();
  }, []);
  // 자막 추가 버튼 클릭 핸들러
  const addSubtitles = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (subtitlefile && lang) {
        // 이미 추가된 언어일 경우 자막파일 교체
        const langItemIdx = subtitleList.findIndex(
          (item) => item.lang === lang,
        );
        let newList = [...subtitleList];
        if (langItemIdx > -1) {
          newList = newList.filter((item) => item.lang !== lang);
        }
        const langIdx = langOptions.findIndex((item) => item.value === lang);
        const addItem = {
          subtitlefile,
          lang,
          langTxt: langOptions[langIdx].label,
        };
        setSubTitleList([...newList, addItem]);
      }
    },
    [lang, subtitlefile, subtitleList],
  );
  // 해당 인덱스의 자막 삭제
  const deleteSubtitle = useCallback(
    (targetLang: string) => {
      setSubTitleList((prev) =>
        prev.filter((item) => targetLang !== item.lang),
      );
    },
    [subtitleList],
  );

  return (
    <>
      <FormTitle>영상 정보</FormTitle>
      <Form>
        <FormItemDiv>
          <Label required>동영상</Label>
          <input
            type="file"
            id="video"
            accept="video/*"
            style={{ display: 'none' }}
            ref={videoInput}
            onChange={(e) => {
              const video = e.target.files && e.target.files[0];
              if (!video) return;
              if (video?.type == 'video/mp4' || video?.type == 'video/mov') {
                setVideoFile(video);
              } else {
                alert('mp4, mov 파일만 업로드할 수 있습니다.');
              }
            }}
          />
          <FlexWrapper gap="1.5">
            <IconButton onClick={clickVideoUploadButton}>
              <BiSolidCameraMovie />
            </IconButton>
            {videoFile && videoFile.name}
          </FlexWrapper>
        </FormItemDiv>
        <FormItemDiv>
          <Label>썸네일</Label>
          <input
            type="file"
            id="image"
            accept="image/*"
            style={{ display: 'none' }}
            ref={coverInput}
            onChange={(e) => {
              const image = e.target.files && e.target.files[0];
              if (!image) return;
              if (
                image.type == 'image/png' ||
                image.type == 'image/jpeg' ||
                image.type == 'image/jpg'
              ) {
                setCoverFile(image);
              } else {
                alert('png, jpg, jpeg 파일만 업로드할 수 있습니다.');
              }
            }}
          />
          <FlexWrapper gap="1.5">
            <IconButton onClick={clickCoverUploadButton}>
              <HiOutlinePhoto />
            </IconButton>
            {coverFile && coverFile.name}
          </FlexWrapper>
        </FormItemDiv>
        <FormItemDiv>
          <Label>자막</Label>
          <FlexWrapper gap="1.5">
            <Select
              onChange={onChangeLang}
              options={langOptions}
              placeholder="언어 선택"
            />
            <input
              type="file"
              id="subtitle"
              accept=".srt, .vtt"
              style={{ display: 'none' }}
              ref={subtitleInput}
              onChange={(e) => {
                const file = e.target.files && e.target.files[0];
                if (!file) return;
                setSubtitlefile(file);
              }}
            />
            <IconButton onClick={clickSubtitleUploadButton}>
              <BsCardText />
            </IconButton>
            {subtitlefile && subtitlefile.name}
            <Button onClick={addSubtitles}>추가</Button>
          </FlexWrapper>
        </FormItemDiv>
        {!isEmpty(subtitleList) && (
          <SubtitleListDiv>
            {subtitleList.map((subtitle) => (
              <SubtitleDiv key={subtitle.lang}>
                {subtitle.langTxt} - {subtitle.subtitlefile.name}
                <div
                  onClick={() => {
                    deleteSubtitle(subtitle.lang);
                  }}
                >
                  &times;
                </div>
              </SubtitleDiv>
            ))}
          </SubtitleListDiv>
        )}
        <FormItemDiv>
          <Label required>화면비율</Label>
          <CheckboxWrapper>
            {screenRatioList.map((ratio) => (
              <FlexWrapper
                key={ratio.screenRatio}
                onClick={() => {
                  setScreenRatio((prev) =>
                    prev !== 0 && prev === ratio.screenRatio
                      ? 0
                      : ratio.screenRatio,
                  );
                }}
              >
                <Checkbox checked={ratio.screenRatio === screenRatio} />
                {ratio.screenRatioTxt}
              </FlexWrapper>
            ))}
          </CheckboxWrapper>
        </FormItemDiv>
        <FormItemDiv>
          <Label required>색채</Label>
          <CheckboxWrapper>
            {colorationList.map((color) => (
              <FlexWrapper
                key={color.coloration}
                onClick={() => {
                  setColoration((prev) =>
                    prev !== 0 && prev === color.coloration
                      ? 0
                      : color.coloration,
                  );
                }}
              >
                <Checkbox checked={color.coloration === coloration} />
                {color.colorationTxt}
              </FlexWrapper>
            ))}
          </CheckboxWrapper>
        </FormItemDiv>
      </Form>
      <ButtonWrapper>
        {props.prevUrl !== null && (
          <Button
            onClick={() => {
              navigate(`/request-movie/register/${props.prevUrl}`);
            }}
          >
            이전
          </Button>
        )}
        {props.nextUrl !== null ? (
          <Button
            onClick={() => {
              navigate(`/request-movie/register/${props.nextUrl}`);
            }}
          >
            다음
          </Button>
        ) : (
          <Button>등록 신청</Button>
        )}
      </ButtonWrapper>
    </>
  );
}

export default VideoInfo;
