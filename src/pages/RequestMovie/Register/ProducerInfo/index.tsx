import React, { useCallback, useEffect, useState } from 'react';
import {
  FormTitle,
  Form,
  ButtonWrapper,
  FormItemDiv,
  Label,
  TagListDiv,
} from '../style';
import { IRegisterProp } from 'types/props';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';
import SearchFilmPeople from './SearchFilmPeople';
import Modal from 'layouts/Modal';
import AddProducerPopup from './AddProducerPopup';
import Input from 'components/Input';
import { InputWrapper } from './style';
import {
  addMovieFilmPeople,
  deleteMovieFilmPeople,
  getMovieFilmPeople,
} from 'api/movie';
import useRequest from 'hooks/useRequest';
import { IMovieFilmPeople } from 'types/db';
import { cloneDeep } from 'lodash';
import InputTagList from 'components/InputTagList';
import { toast } from 'react-toastify';
import useInput from 'hooks/useInput';

interface IForm {
  label: string;
  values: IMovieFilmPeople[];
  rolesSeq: number;
}

function ProducerInfo({ movSeq, step, setCurStep, stepSize }: IRegisterProp) {
  const ETC_ROLE_SEQ = 199;
  const { t } = useTranslation();
  const [filmoRole, onChangeFilmoRole, setFilmoRole] = useInput('');
  // 제작자 추가 팝업
  const [showAddPopup, setShowAddPopup] = useState(false);
  const closeAddPopup = useCallback(() => {
    setShowAddPopup(false);
  }, []);
  // 폼 목록
  const [formList, setFormList] = useState<IForm[]>([
    { label: t('director'), values: [], rolesSeq: 101 },
  ]);
  // 제작자 정보 로드
  const requestProducerInfo =
    useRequest<IMovieFilmPeople[]>(getMovieFilmPeople);
  const loadProducerInfo = useCallback(() => {
    requestProducerInfo(movSeq)
      .then((data) => {
        setFormList((prev) => {
          let newFormList: IForm[] = cloneDeep(prev);
          newFormList = newFormList.map((form) => ({ ...form, values: [] }));
          data.forEach((item) => {
            const idx = newFormList.findIndex(
              (form) => form.rolesSeq === item.rolesSeq,
            );
            if (idx >= 0) {
              newFormList[idx].values.push(item);
            } else {
              newFormList.push({
                label: item.rolesKoName,
                rolesSeq: item.rolesSeq,
                values: [item],
              });
            }
          });
          return newFormList;
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [movSeq]);
  useEffect(() => {
    loadProducerInfo();
  }, [movSeq]);
  // 폼 추가
  const addForm = useCallback(
    (label: string, rolesSeq: number) => {
      const idx = formList.findIndex((item) => item.rolesSeq === rolesSeq);
      if (idx >= 0) {
        toast.error('이미 추가된 역할입니다.');
        return;
      }
      const newForm: IForm = {
        label: label,
        values: [],
        rolesSeq,
      };
      setFormList((prev) => [...prev, newForm]);
    },
    [formList],
  );
  // 제작자 정보 추가
  const requestAddProducer = useRequest<boolean>(addMovieFilmPeople);
  const addProducer = useCallback(
    (rolesSeq: number, fpSeq: number) => {
      const peopleInfo = { rolesSeq, fpSeq, filmoRole: '' };
      if (rolesSeq === ETC_ROLE_SEQ) {
        if (!filmoRole.trim()) return;
        peopleInfo.filmoRole = filmoRole;
      }
      requestAddProducer({ movSeq, peopleInfo })
        .then(() => {
          loadProducerInfo();
          setFilmoRole('');
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [movSeq, filmoRole],
  );
  // 제작자 정보 삭제
  const requestDeleteProducer = useRequest<boolean>(deleteMovieFilmPeople);
  const delProducer = useCallback(
    (mfpSeq: number) => {
      requestDeleteProducer({ movSeq, mfpSeq })
        .then(() => {
          loadProducerInfo();
        })
        .catch((e) => {
          console.error(e);
        });
    },
    [movSeq],
  );

  return (
    <>
      <FormTitle>제작자 정보</FormTitle>
      <Form>
        {formList.map((form, i) => (
          <FormItemDiv key={i}>
            <Label required={form.rolesSeq === 101}>{form.label}</Label>
            <InputWrapper>
              {form.rolesSeq === ETC_ROLE_SEQ && (
                <Input
                  placeholder="역할을 입력해주세요"
                  value={filmoRole}
                  onChange={onChangeFilmoRole}
                />
              )}
              <SearchFilmPeople
                movSeq={movSeq}
                addProducer={(fpSeq) => {
                  addProducer(form.rolesSeq, fpSeq);
                }}
              />
            </InputWrapper>
            <TagListDiv>
              <InputTagList
                tagList={form.values.map((item) =>
                  form.rolesSeq === ETC_ROLE_SEQ
                    ? `${item.fpKoName} (${item.filmoRole})`
                    : item.fpKoName,
                )}
                deleteTag={(i: number) => {
                  delProducer(form.values[i].mfpSeq);
                }}
              />
            </TagListDiv>
          </FormItemDiv>
        ))}
      </Form>
      <Button
        onClick={() => {
          setShowAddPopup(true);
        }}
      >
        제작자 정보 추가
      </Button>
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
          <Button
            onClick={() => {
              setCurStep(step + 1);
            }}
          >
            {t('next')}
          </Button>
        ) : (
          <Button>{t('registerRequest')}</Button>
        )}
      </ButtonWrapper>
      <Modal backgroundFilter show={showAddPopup} onCloseModal={closeAddPopup}>
        <AddProducerPopup
          closeAddPopup={closeAddPopup}
          onClickHandler={addForm}
        />
      </Modal>
    </>
  );
}

export default ProducerInfo;
