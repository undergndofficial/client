/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import Input from 'components/Input';
import Select from 'components/Select';
import { IGerne, ILang, INation, IRating } from 'types/common';
import useRequest from 'hooks/useRequest';
import {
  getGerneList,
  getLanguageList,
  getNationList,
  getRatingList,
} from 'api/common';
import Button from 'components/Button';
import Checkbox from 'components/Checkbox';
import {
  Form,
  FormItemDiv,
  Label,
  CheckboxWrapper,
  FlexWrapper,
  TagListDiv,
  Textarea,
} from '../style';
import useInput from 'hooks/useInput';
import useTagInput from 'hooks/useTagInput';
import { getSelectOptionList } from 'utils/common';
import useSelect from 'hooks/useSelect';
import InputTagList from 'components/InputTagList';
import DatePicker from 'components/DatePicker';

/**
 * 영화 등록 > 작품 정보
 */
function MovieInfo() {
  const [nationalitySeq, setNationalitySeq] = useState('');
  const [ratingSeq, setRatingSeq] = useState('');
  const [langCode, setLangCode] = useState('');
  const [productionYear, setProductionYear] = useState('');
  const [onlinePublishFlag, setOnlinePublishFlag] = useState(false);
  const [onlinePublish, onChangeOnlinePublish] = useInput('');
  const [movPlot, onChangeMovPlot] = useInput('');
  const [directorNote, onChangeDirectorNote] = useInput('');
  const [releasedAt, setReleasedAt] = useState<Date | null>(null);
  const [gerneList, setGerneList] = useState<IGerne[]>([]); // 장르 목록
  const [nationOptions, setNationOptions, onChangeNation] =
    useSelect(setNationalitySeq); // 국가 목록
  const [ratingOptions, setRatingOptions, onChangeRating] =
    useSelect(setRatingSeq); // 관람 등급 목록
  const [langOptions, setLangOptions, onChangeLang] = useSelect(setLangCode); // 사용 언어 목록
  const [
    productionYearOptions,
    setProductionYearOptions,
    onChangeProductionYear,
  ] = useSelect(setProductionYear);

  // 기본 데이터 호출
  const requestGerneList = useRequest<IGerne[]>(getGerneList);
  const requestNationList = useRequest<INation[]>(getNationList);
  const requestRatingList = useRequest<IRating[]>(getRatingList);
  const requestLangList = useRequest<ILang[]>(getLanguageList);
  useEffect(() => {
    // 장르 목록
    requestGerneList({}).then((data) => {
      setGerneList(data);
    });
    // 국가 목록
    requestNationList({}).then((data) => {
      const optionData = data as unknown as { [key: string]: string }[];
      setNationOptions(
        getSelectOptionList(optionData, 'nation', 'nationalitySeq'),
      );
    });
    // 관람등급 목록
    requestRatingList({}).then((data) => {
      const optionData = data as unknown as { [key: string]: string }[];
      setRatingOptions(
        getSelectOptionList(optionData, 'ratingTxt', 'ratingSeq'),
      );
    });
    // 언어 목록
    requestLangList({}).then((data) => {
      const optionData = data as unknown as { [key: string]: string }[];
      setLangOptions(getSelectOptionList(optionData, 'langName', 'langCode'));
    });
    // 제작년도 정보 (1970 ~ 현재년도+2)
    const currentYear: number = new Date().getFullYear() + 2;
    const yearsArray: { label: string; value: string }[] = [];
    for (let i = 1970; i < currentYear; i++) {
      yearsArray.push({ label: i.toString(), value: i.toString() });
    }
    setProductionYearOptions(yearsArray);
  }, []);

  // 선택한 장르 목록
  const [selectedGerneList, setSelectedGerneList] = useState<{
    [key: number]: boolean;
  }>({});
  const toggleSelectedGerne = (key: number) => {
    setSelectedGerneList((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 태그
  const [tag, onChangeTag, setTag] = useInput<string>('');
  const [isComposingTag, setIsComposingTag] = useState(false);
  const [tags, , deleteTag, addTag, onKeyDownTag] = useTagInput(
    setTag,
    isComposingTag,
  );

  // 배급사
  const [distributor, onChangeDistributor, setDistributor] =
    useInput<string>('');
  const [isComposingDistributor, setIsComposingDistributor] = useState(false);
  const [
    distributors,
    ,
    deleteDistributor,
    addDistributor,
    onKeyDownDistributor,
  ] = useTagInput(setDistributor, isComposingDistributor);

  return (
    <Form>
      <FormItemDiv>
        <Label>제목</Label>
        <Input placeholder="제목을 입력해주세요" />
        {/* {errors.title && (
          <WarningMessageDiv>{errors.title.message}</WarningMessageDiv>
        )} */}
      </FormItemDiv>
      <FormItemDiv>
        <Label>영문 제목</Label>
        <Input placeholder="영문 제목을 입력해주세요" />
      </FormItemDiv>
      {/* <FormItemDiv>
        <Label>구분</Label>
        <Select
          onChange={onChangeCategory}
          options={categoryOptions}
          placeholder="구분 선택"
        />
      </FormItemDiv> */}
      <FormItemDiv>
        <Label>세부 장르</Label>
        <CheckboxWrapper>
          {gerneList.map((gerne) => (
            <FlexWrapper
              key={gerne.gernSeq}
              onClick={() => {
                toggleSelectedGerne(gerne.gernSeq);
              }}
            >
              <Checkbox checked={selectedGerneList[gerne.gernSeq]} />
              {gerne.gernName}
            </FlexWrapper>
          ))}
        </CheckboxWrapper>
      </FormItemDiv>
      <FormItemDiv>
        <Label>태그</Label>
        <>
          <Input
            placeholder="태그 선택"
            value={tag}
            onChange={onChangeTag}
            onKeyDown={(e) => {
              onKeyDownTag(e, tag);
            }}
            onCompositionStart={() => setIsComposingTag(true)}
            onCompositionEnd={() => setIsComposingTag(false)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              addTag(tag);
            }}
          >
            추가
          </Button>
        </>
        <TagListDiv>
          <InputTagList tagList={tags} deleteTag={deleteTag} />
        </TagListDiv>
      </FormItemDiv>
      <FormItemDiv>
        <Label>관람 등급</Label>
        <Select
          onChange={onChangeRating}
          options={ratingOptions}
          placeholder="관람등급 선택"
        />
      </FormItemDiv>
      <FormItemDiv>
        <Label>사용 언어</Label>
        <Select
          onChange={onChangeLang}
          options={langOptions}
          placeholder="언어 선택"
        />
      </FormItemDiv>
      <FormItemDiv>
        <Label>제작국가</Label>
        <Select
          onChange={onChangeNation}
          options={nationOptions}
          placeholder="국가 선택"
        />
      </FormItemDiv>
      <FormItemDiv>
        <Label>제작년도</Label>
        <Select
          onChange={onChangeProductionYear}
          options={productionYearOptions}
          placeholder="제작년도 선택"
        />
      </FormItemDiv>
      <FormItemDiv>
        <Label>개봉일</Label>
        <DatePicker
          selectedDate={releasedAt}
          setSelectedDate={setReleasedAt}
          placeholder="개봉일 선택"
        />
      </FormItemDiv>
      <FormItemDiv>
        <Label>배급사</Label>
        <>
          <Input
            placeholder="배급사 입력"
            value={distributor}
            onChange={onChangeDistributor}
            onKeyDown={(e) => {
              onKeyDownDistributor(e, distributor);
            }}
            onCompositionStart={() => setIsComposingDistributor(true)}
            onCompositionEnd={() => setIsComposingDistributor(false)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              addDistributor(distributor);
            }}
          >
            추가
          </Button>
        </>
        <TagListDiv>
          <InputTagList tagList={distributors} deleteTag={deleteDistributor} />
        </TagListDiv>
      </FormItemDiv>
      <FormItemDiv>
        <Label>온라인 공개 이력</Label>
        <CheckboxWrapper>
          <FlexWrapper
            onClick={() => {
              setOnlinePublishFlag((prev) => !prev);
            }}
          >
            <Checkbox checked={!onlinePublishFlag} />
            미공개
          </FlexWrapper>
          <FlexWrapper gap="1">
            <FlexWrapper
              onClick={() => {
                setOnlinePublishFlag((prev) => !prev);
              }}
            >
              <Checkbox checked={onlinePublishFlag} />
              공개
            </FlexWrapper>
            {onlinePublishFlag && (
              <Input
                placeholder="플랫폼명"
                value={onlinePublish}
                onChange={onChangeOnlinePublish}
              />
            )}
          </FlexWrapper>
        </CheckboxWrapper>
      </FormItemDiv>
      <FormItemDiv>
        <Label>시놉시스</Label>
        <Textarea
          placeholder="시놉시스를 입력해주세요"
          value={movPlot}
          onChange={onChangeMovPlot}
        />
      </FormItemDiv>
      <FormItemDiv>
        <Label>기획 의도</Label>
        <Textarea
          placeholder="기획 의도를 입력해주세요"
          value={directorNote}
          onChange={onChangeDirectorNote}
        />
      </FormItemDiv>
    </Form>
  );
}

export default MovieInfo;
