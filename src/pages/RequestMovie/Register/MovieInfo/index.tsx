/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useCallback, useEffect, useState } from 'react';
import Input from 'components/Input';
import Select from 'components/Select';
import useRequest from 'hooks/useRequest';
import {
  getCategoryList,
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
  FormTitle,
  ButtonWrapper,
} from '../style';
import useInput from 'hooks/useInput';
import useTagInput from 'hooks/useTagInput';
import { getSelectOptionList } from 'utils/common';
import useSelect from 'hooks/useSelect';
import InputTagList from 'components/InputTagList';
import DatePicker from 'components/DatePicker';
import { IRegisterProp } from 'types/props';
import {
  IMovieInfo,
  IGerne,
  ILang,
  INation,
  IRating,
  IMovieGerne,
  IMovieTag,
  IMovieDistributor,
  ICategory,
} from 'types/db';
import {
  addMovieDistributor,
  addMovieGerne,
  addMovieTag,
  deleteMovieDistributor,
  deleteMovieGerne,
  deleteMovieTag,
  getDistributorInfo,
  getGerneInfo,
  getMovieTagInfo,
  registerMovieInfo,
  updateMovieInfo,
} from 'api/movie';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { SelectOptionType } from 'types/common';
import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';

/**
 * 영화 등록 > 작품 정보
 */
function MovieInfo({
  movSeq,
  setMovSeq,
  step,
  setCurStep,
  stepSize,
  movieInfo,
  loadData,
}: IRegisterProp) {
  const { t } = useTranslation();
  const [movTitle, onChangeMovTitle, setMovTitle] = useInput(''); // 제목
  const [movTitleEn, onChangeMovTitleEn, setMovTitleEn] = useInput(''); // 영문 제목
  const [category, setCategory] = useState<SelectOptionType>(null);
  const [nationality, setNationality] = useState<SelectOptionType>(null); // 국가
  const [rating, setRating] = useState<SelectOptionType>(null); // 관람 등급
  const [lang, setLang] = useState<SelectOptionType>(null); // 언어
  const [productionYear, setProductionYear] = useState<SelectOptionType>(null); // 제작년도
  const [onlinePublishFlag, setOnlinePublishFlag] = useState(false); // 온라인 공개 이력
  const [onlinePublish, onChangeOnlinePublish, setOnlinePublish] = useInput(''); // 온라인 공개 플랫폼
  const [movPlot, onChangeMovPlot, setMovPlot] = useInput(''); // 시놉시스
  const [directorNote, onChangeDirectorNote, setDirectorNote] = useInput(''); // 기획자 의도
  const [releasedAt, setReleasedAt] = useState<Date | null>(null); // 개봉일
  // 선택한 장르 목록
  const [selectedGerneList, setSelectedGerneList] = useState<{
    [key: number]: boolean;
  }>({});
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
    setDistributors,
    deleteDistributor,
    addDistributor,
    onKeyDownDistributor,
  ] = useTagInput(setDistributor, isComposingDistributor);

  const [gerneList, setGerneList] = useState<IGerne[]>([]); // 장르 목록
  const [categoryOptions, setCategoryOptions, onChangeCategory] =
    useSelect(setCategory); // 카테고리 목록
  const [nationOptions, setNationOptions, onChangeNation] =
    useSelect(setNationality); // 국가 목록
  const [ratingOptions, setRatingOptions, onChangeRating] =
    useSelect(setRating); // 관람 등급 목록
  const [langOptions, setLangOptions, onChangeLang] = useSelect(setLang); // 사용 언어 목록
  // 제작년도 목록
  const [
    productionYearOptions,
    setProductionYearOptions,
    onChangeProductionYear,
  ] = useSelect(setProductionYear);

  // 수정일 경우 원본 정보들
  const [originGenres, setOriginGenres] = useState<IMovieGerne[]>([]);
  const [originTags, setOriginTags] = useState<IMovieTag[]>([]);
  const [originDistributor, setOriginDistributor] = useState<
    IMovieDistributor[]
  >([]);
  // 원본 정보들 호출
  const requestOriginGenrens = useRequest<IMovieGerne[]>(getGerneInfo);
  const requsetOriginTags = useRequest<IMovieTag[]>(getMovieTagInfo);
  const requsetOriginDistributor =
    useRequest<IMovieDistributor[]>(getDistributorInfo);

  // 기본 데이터 호출
  const requestGerneList = useRequest<IGerne[]>(getGerneList);
  const requsetCategoryList = useRequest<ICategory[]>(getCategoryList);
  const requestNationList = useRequest<INation[]>(getNationList);
  const requestRatingList = useRequest<IRating[]>(getRatingList);
  const requestLangList = useRequest<ILang[]>(getLanguageList);
  useEffect(() => {
    // 장르 목록
    requestGerneList({}).then((data) => {
      setGerneList(data);
    });
    // 카테고리 목록
    requsetCategoryList({}).then((data) => {
      const optionData = data as unknown as { [key: string]: string }[];
      setCategoryOptions(getSelectOptionList(optionData, 'catName', 'catSeq'));
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

  // 태그 로드
  const loadTags = useCallback(() => {
    requsetOriginTags(movSeq)
      .then((data) => {
        setOriginTags(data);
      })
      .catch((e) => console.error(e));
  }, [movSeq]);
  // 배급사 로드
  const loadDists = useCallback(() => {
    requsetOriginDistributor(movSeq)
      .then((data) => {
        setOriginDistributor(data);
        const dists = data.map((item) => item.distName);
        setDistributors(dists);
      })
      .catch((e) => console.error(e));
  }, [movSeq]);
  // 장르 로드
  const loadGernes = useCallback(() => {
    requestOriginGenrens(movSeq)
      .then((data) => {
        setOriginGenres(data);
        const newSelectedGerneList: {
          [key: number]: boolean;
        } = {};
        const gernes = gerneList
          .filter((g) => data.some((o) => o.gernName === g.gernName))
          .map((item) => item.gernSeq);
        gernes.forEach((item) => {
          newSelectedGerneList[item] = true;
        });
        setSelectedGerneList(newSelectedGerneList);
      })
      .catch((e) => console.error(e));
  }, [movSeq, gerneList]);

  // 영화 기본 정보 저장
  useEffect(() => {
    if (!movieInfo) return;
    setMovTitle(movieInfo?.movTitle || '');
    setMovTitleEn(movieInfo?.movTitleEn || '');
    const catIdx = categoryOptions.findIndex(
      (item) => item.label === movieInfo.catName,
    );
    setCategory(categoryOptions[catIdx]);
    const ratingIdx = ratingOptions.findIndex(
      (item) => item.label === movieInfo.ratingTxt,
    );
    setRating(ratingOptions[ratingIdx]);
    const langIdx = langOptions.findIndex(
      (item) => item.label === movieInfo.langName,
    );
    setLang(langOptions[langIdx]);
    const nationIdx = nationOptions.findIndex(
      (item) => item.label === movieInfo.nation,
    );
    setNationality(nationOptions[nationIdx]);
    setProductionYear({
      label: movieInfo?.productionYear.toString(),
      value: movieInfo?.productionYear.toString(),
    });
    setReleasedAt(movieInfo.releasedAt ? new Date(movieInfo.releasedAt) : null);
    if (movieInfo.onlinePublish) {
      setOnlinePublishFlag(true);
      setOnlinePublish(movieInfo.onlinePublish);
    }
    setMovPlot(movieInfo.movPlot);
    setDirectorNote(movieInfo.directorNote);
    // movSeq가 있는 경우 movSeq로 영화 정보 불러오기
    loadGernes();
    loadTags();
    loadDists();
  }, [movieInfo, gerneList, ratingOptions, langOptions, nationOptions]);
  // 영화 정보 폼 내용 가져오기
  const getMovieFormInfo = () => {
    const gernes = gerneList
      .filter((item) => selectedGerneList[item.gernSeq])
      .map((gerne) => gerne.gernSeq);
    const movieInfo: IMovieInfo = {
      movTitle,
      movTitleEn,
      catSeq: parseInt(category?.value as string),
      gernes,
      tags,
      ratingSeq: parseInt(rating?.value as string),
      langCode: lang?.value as string,
      nationalitySeq: nationality?.value as string,
      productionYear: parseInt(productionYear?.value as string),
      releasedAt: releasedAt && dayjs(releasedAt).format('YYYY-MM-DD'),
      distributors,
      onlinePublish: onlinePublishFlag ? onlinePublish : null,
      movPlot,
      directorNote,
    };
    return movieInfo;
  };
  // 영화 기본정보 등록 요청
  const requestBasicInfo = useRequest<{ movSeq: number }>(registerMovieInfo);
  // 기본 정보를 저장한다.
  const saveProc = () => {
    const movieInfo = getMovieFormInfo();
    requestBasicInfo(movieInfo)
      .then((data) => {
        if (setMovSeq) setMovSeq(data.movSeq);
        setCurStep(step + 1);
      })
      .catch((e) => {
        console.error(e.message);
      });
  };
  // 정보 수정 요청
  const requestUpdateMovieInfo = useRequest<boolean>(updateMovieInfo);
  const requestAddGern = useRequest<boolean>(addMovieGerne);
  const requestDelGern = useRequest<boolean>(deleteMovieGerne);
  const requestAddTag = useRequest<boolean>(addMovieTag);
  const requestDelTag = useRequest<boolean>(deleteMovieTag);
  const requestAddDist = useRequest<boolean>(addMovieDistributor);
  const requestDelDist = useRequest<boolean>(deleteMovieDistributor);
  // 저장된 태그 삭제
  const deleteTagProc = useCallback(
    (tmSeq: number) => {
      requestDelTag({ movSeq, tmSeq })
        .then(() => {
          loadTags();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [movSeq],
  );
  // 저장된 영화 정보에 태그 추가
  const addTagProc = useCallback(
    (tagName: string) => {
      requestAddTag({ movSeq, tagName })
        .then(() => {
          loadTags();
          setTag('');
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [movSeq],
  );
  // 저장된 배급사 삭제
  const deleteDistProc = useCallback(
    (dmSeq: number) => {
      requestDelDist({ movSeq, dmSeq })
        .then(() => {
          loadDists();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [movSeq],
  );
  // 저장된 영화 정보에 배급사 추가
  const addDistProc = useCallback(
    (distName: string) => {
      requestAddDist({ movSeq, distName })
        .then(() => {
          loadDists();
          setDistributor('');
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [movSeq],
  );
  // 저장된 장르 삭제
  const deleteGernProc = useCallback(
    (gmSeq: number) => {
      requestDelGern({ movSeq, gmSeq })
        .then(() => {
          loadGernes();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [movSeq, gerneList],
  );
  // 저장된 영화 정보에 장르 추가
  const addGernProc = useCallback(
    (gernSeq: number) => {
      requestAddGern({ movSeq, gernSeq })
        .then(() => {
          loadGernes();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [movSeq, gerneList],
  );
  // 장르 체크박스를 토글한다.
  const toggleSelectedGerne = (key: number) => {
    // 생성 시 추가되는 경우
    if (!movSeq) {
      setSelectedGerneList((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    } else {
      // 기존 영화에 추가
      if (!selectedGerneList[key]) {
        addGernProc(key);
      } else {
        // 기존 영화에서 삭제
        const gernIdx = gerneList.findIndex((item) => item.gernSeq === key);
        const gernName = gerneList[gernIdx].gernName;
        const originIdx = originGenres.findIndex(
          (item) => item.gernName === gernName,
        );
        const gmSeq = originGenres[originIdx].gmSeq;
        deleteGernProc(gmSeq);
      }
    }
  };
  // 기본 정보를 수정한다
  const updateProc = async () => {
    // 기본 정보
    const movieInfo: Omit<IMovieInfo, 'gernes' | 'tags' | 'distributors'> = {
      movTitle,
      movTitleEn,
      catSeq: parseInt(category?.value as string),
      ratingSeq: parseInt(rating?.value as string),
      langCode: lang?.value as string,
      nationalitySeq: nationality?.value as string,
      productionYear: parseInt(productionYear?.value as string),
      releasedAt: releasedAt && dayjs(releasedAt).format('YYYY-MM-DD'),
      onlinePublish: onlinePublishFlag ? onlinePublish : null,
      movPlot,
      directorNote,
    };
    await requestUpdateMovieInfo({ movSeq, movieInfo }).catch((e) => {
      console.error(e.message);
    });
    if (loadData) loadData();
    setCurStep(step + 1);
  };

  const vaildateForm = () => {
    const gernes = gerneList
      .filter((item) => selectedGerneList[item.gernSeq])
      .map((gerne) => gerne.gernSeq);
    if (
      !movTitleEn ||
      !category ||
      isEmpty(gernes) ||
      !rating ||
      !lang ||
      !nationality ||
      !productionYear ||
      !movPlot ||
      (onlinePublishFlag && !onlinePublish)
    ) {
      toast.error('필수 값을 모두 입력해주세요.');
      return false;
    }
    return true;
  };

  // 다음 버튼을 클릭한다.
  const onClickNextButtton = () => {
    if (!vaildateForm()) {
      return;
    }
    // movSeq가 있으면 수정
    if (movSeq) {
      updateProc();
    } else {
      // 아니면 저장
      saveProc();
    }
  };

  return (
    <>
      <FormTitle>{t('movieInfo')}</FormTitle>
      <Form>
        <FormItemDiv>
          <Label>{t('title')}</Label>
          <Input
            placeholder={t('message.message46')}
            value={movTitle}
            onChange={onChangeMovTitle}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('enTitle')}</Label>
          <Input
            placeholder={t('message.message47')}
            value={movTitleEn}
            onChange={onChangeMovTitleEn}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('category')}</Label>
          <Select
            onChange={onChangeCategory}
            options={categoryOptions}
            placeholder={t('selectCategory')}
            value={category}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('detailGerne')}</Label>
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
          <Label>{t('tag')}</Label>
          <>
            <Input
              placeholder={t('message.message51')}
              value={tag}
              onChange={onChangeTag}
              onKeyDown={(e) => {
                if (movSeq) {
                  if (isComposingTag) return;
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTagProc(tag);
                  }
                } else {
                  onKeyDownTag(e, tag);
                }
              }}
              onCompositionStart={() => setIsComposingTag(true)}
              onCompositionEnd={() => setIsComposingTag(false)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (movSeq) {
                  addTagProc(tag);
                } else {
                  addTag(tag);
                }
              }}
            >
              {t('add')}
            </Button>
          </>
          <TagListDiv>
            {movSeq ? (
              <InputTagList
                tagList={originTags.map((item) => item.tagName)}
                deleteTag={(i) => {
                  deleteTagProc(originTags[i].tmSeq);
                }}
              />
            ) : (
              <InputTagList tagList={tags} deleteTag={deleteTag} />
            )}
          </TagListDiv>
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('watchRating')}</Label>
          <Select
            onChange={onChangeRating}
            options={ratingOptions}
            placeholder={t('selectWatchRating')}
            value={rating}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('usedLanguage')}</Label>
          <Select
            onChange={onChangeLang}
            options={langOptions}
            placeholder={t('selectLanguage')}
            value={lang}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('madeNation')}</Label>
          <Select
            onChange={onChangeNation}
            options={nationOptions}
            placeholder={t('selectNation2')}
            value={nationality}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('productionYear')}</Label>
          <Select
            onChange={onChangeProductionYear}
            options={productionYearOptions}
            placeholder={t('selectProductionYear')}
            value={productionYear}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label>{t('releasedAt')}</Label>
          <DatePicker
            selectedDate={releasedAt}
            setSelectedDate={setReleasedAt}
            placeholder={t('selectReleasedAt')}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label>{t('distributor')}</Label>
          <>
            <Input
              placeholder={t('message.message48')}
              value={distributor}
              onChange={onChangeDistributor}
              onKeyDown={(e) => {
                if (movSeq) {
                  if (isComposingDistributor) return;
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addDistProc(distributor);
                  }
                } else {
                  onKeyDownDistributor(e, distributor);
                }
              }}
              onCompositionStart={() => setIsComposingDistributor(true)}
              onCompositionEnd={() => setIsComposingDistributor(false)}
            />
            <Button
              onClick={(e) => {
                e.preventDefault();
                if (movSeq) {
                  addDistProc(distributor);
                } else {
                  addDistributor(distributor);
                }
              }}
            >
              {t('add')}
            </Button>
          </>
          <TagListDiv>
            {movSeq ? (
              <InputTagList
                tagList={originDistributor.map((item) => item.distName)}
                deleteTag={(i) => {
                  deleteDistProc(originDistributor[i].dmSeq);
                }}
              />
            ) : (
              <InputTagList
                tagList={distributors}
                deleteTag={deleteDistributor}
              />
            )}
          </TagListDiv>
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('onlinePublishHistory')}</Label>
          <CheckboxWrapper>
            <FlexWrapper
              onClick={() => {
                setOnlinePublishFlag((prev) => !prev);
              }}
            >
              <Checkbox checked={!onlinePublishFlag} />
              {t('private')}
            </FlexWrapper>
            <FlexWrapper gap="1">
              <FlexWrapper
                onClick={() => {
                  setOnlinePublishFlag((prev) => !prev);
                }}
              >
                <Checkbox checked={onlinePublishFlag} />
                {t('public')}
              </FlexWrapper>
              {onlinePublishFlag && (
                <Input
                  placeholder={t('platformName')}
                  value={onlinePublish}
                  onChange={onChangeOnlinePublish}
                />
              )}
            </FlexWrapper>
          </CheckboxWrapper>
        </FormItemDiv>
        <FormItemDiv>
          <Label required>{t('synopsis')}</Label>
          <Textarea
            placeholder={t('message.message49')}
            value={movPlot}
            onChange={onChangeMovPlot}
          />
        </FormItemDiv>
        <FormItemDiv>
          <Label>{t('directorNote')}</Label>
          <Textarea
            placeholder={t('message.message50')}
            value={directorNote}
            onChange={onChangeDirectorNote}
          />
        </FormItemDiv>
      </Form>
      <ButtonWrapper>
        {step > 0 && (
          <Button
            onClick={() => {
              setCurStep(step - 1);
            }}
          >
            {t('prev')}
          </Button>
        )}
        {step < stepSize - 1 ? (
          <Button onClick={onClickNextButtton}>{t('next')}</Button>
        ) : (
          <Button>{t('registerRequest')}</Button>
        )}
      </ButtonWrapper>
    </>
  );
}

export default MovieInfo;
