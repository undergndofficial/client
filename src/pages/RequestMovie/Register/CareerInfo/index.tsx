import React, { useState } from 'react';
import { ButtonWrapper, Form, FormItemDiv, FormTitle } from '../style';
import Input from 'components/Input';
import useInput from 'hooks/useInput';
import useTagInput from 'hooks/useTagInput';
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
import { useNavigate, useOutletContext } from 'react-router-dom';

function CareerInfo() {
  const { props }: { props: IRegisterProp } = useOutletContext();
  const navigate = useNavigate();
  const [career, onChangeCareer, setCareer] = useInput<string>('');
  const [isComposing, setIsComposing] = useState(false);
  const [careers, setCareers, deleteCareer, addCareer, onKeyDownCareer] =
    useTagInput(setCareer, isComposing);
  // Draggable이 Droppable로 드래그 되었을 때 실행되는 이벤트
  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) return;
    const newCareers = [...careers];
    // 기존 아이템을 새로운 위치에 삽입
    const [targetItem] = newCareers.splice(source.index, 1);
    newCareers.splice(destination.index, 0, targetItem);
    setCareers(newCareers);
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
              onKeyDownCareer(e, career);
            }}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              addCareer(career);
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
                      key={`${item}${index}`}
                      draggableId={`${item}${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <CareerDiv
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {careers.length - index}&nbsp;&nbsp;&nbsp;{item}
                          <div
                            onClick={() => {
                              deleteCareer(index);
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

export default CareerInfo;
