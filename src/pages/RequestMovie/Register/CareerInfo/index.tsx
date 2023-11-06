import React, { useCallback, useEffect, useState } from 'react';
import { ButtonWrapper, Form, FormItemDiv, FormTitle } from '../style';
import Input from 'components/Input';
import useInput from 'hooks/useInput';
import Button from 'components/Button';
import { isEmpty } from 'lodash';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { CareerDiv, CareerListDiv } from './style';
import { IRegisterProp } from 'types/props';
import { useTranslation } from 'react-i18next';
import {
  deleteAward,
  getAwardList,
  registerAward,
  updateOrderAward,
} from 'api/movie';
import useRequest from 'hooks/useRequest';
import { IAward } from 'types/db';

function CareerInfo({ movSeq, step, setCurStep, stepSize }: IRegisterProp) {
  const { t } = useTranslation();
  const [career, onChangeCareer, setCareer] = useInput<string>('');
  const [careers, setCareers] = useState<IAward[]>([]);
  const [isComposing, setIsComposing] = useState(false);

  // 수상 정보 불러오기
  const requestCareers = useRequest<IAward[]>(getAwardList);
  const fetchCareers = useCallback(() => {
    requestCareers({
      movSeq: movSeq,
    })
      .then((data) => {
        setCareers(data);
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [movSeq]);
  useEffect(() => {
    fetchCareers();
  }, [movSeq]);

  // Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트 (순서 변경)
  const requestCareerOrderInfo = useRequest<boolean>(updateOrderAward);
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const newCareers = [...careers];
    // 기존 아이템을 새로운 위치에 삽입
    const [targetItem] = newCareers.splice(source.index, 1);
    newCareers.splice(destination.index, 0, targetItem);
    setCareers(newCareers);
    requestCareerOrderInfo({
      movSeq: movSeq as number,
      awSeq: targetItem.awSeq,
      inorder: destination.index,
    }).catch((e) => {
      console.error(e.message);
    });
  };
  // 수상 경력 정보 저장
  const requestCareerInfo = useRequest<boolean>(registerAward);
  const saveCareer = useCallback(() => {
    requestCareerInfo({
      movSeq: movSeq,
      awardContent: career,
    })
      .then(() => {
        fetchCareers();
        setCareer('');
      })
      .catch((e) => {
        console.error(e.message);
      });
  }, [career]);
  // 수상 경력 정보 삭제
  const deleteCareerInfo = useRequest<boolean>(deleteAward);
  const deleteCareer = useCallback(
    (awSeq: number) => {
      deleteCareerInfo({
        movSeq: movSeq,
        awSeq: awSeq.toString(),
      })
        .then(() => {
          fetchCareers();
        })
        .catch((e) => {
          console.error(e.message);
        });
    },
    [movSeq],
  );
  // 다음 버튼 클릭
  const onClickNextButton = () => {
    setCurStep(step + 1);
  };

  return (
    <>
      <FormTitle>작품 상영/수상 경력</FormTitle>
      <Form>
        <FormItemDiv>
          <Input
            placeholder="이력을 입력해주세요"
            value={career}
            onChange={onChangeCareer}
            onKeyDown={(e) => {
              if (isComposing) return;
              if (e.key === 'Enter') {
                e.preventDefault();
                saveCareer();
              }
            }}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              saveCareer();
            }}
          >
            추가
          </Button>
        </FormItemDiv>
        {!isEmpty(careers) && (
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <CareerListDiv
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {careers.map((item, index) => (
                    <Draggable
                      key={`${item.awSeq}`}
                      draggableId={`${item.awSeq}`}
                      index={index}
                    >
                      {(provided) => (
                        <CareerDiv
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {index + 1}&nbsp;&nbsp;&nbsp;
                          {item.awardContent}
                          <div
                            onClick={() => {
                              deleteCareer(item.awSeq);
                            }}
                          >
                            &times;
                          </div>
                        </CareerDiv>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </CareerListDiv>
              )}
            </Droppable>
          </DragDropContext>
        )}
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
          <Button onClick={onClickNextButton}>{t('next')}</Button>
        ) : (
          <Button>{t('registerRequest')}</Button>
        )}
      </ButtonWrapper>
    </>
  );
}

export default CareerInfo;
