import React, { useState } from 'react';
import {
  Container,
  // StarWrapper,
  // StarIcon,
  // BackButton,
  // StarRateDiv,
  CommentInput,
  CommentListDiv,
  WriterInfoDiv,
  ContentDiv,
  ProfileImageDiv,
  WriterDiv,
  CommentInfoWrapper,
  CommentToolWrapper,
  CommentContainer,
} from './style';
// import { BsChevronRight } from 'react-icons/bs';
import { BiDotsVerticalRounded, BiSolidTrash } from 'react-icons/bi';
// import { PiFlagPennantFill } from 'react-icons/pi';
import { LuPenSquare } from 'react-icons/lu';
import Input from 'components/Input';
import Button from 'components/Button';
import { useTranslation } from 'react-i18next';

function Comment() {
  const { t } = useTranslation();
  // const [starRate, setStarRate] = useState(0);
  const [showToolIndex, setShowToolIndex] = useState(-1);

  return (
    <Container>
      {/* <StarWrapper>
        {starRate == 0 &&
          [...Array(5)].map((_, i) => (
            <StarIcon
              key={i}
              size="25"
              onClick={() => {
                setStarRate(i + 1);
              }}
            />
          ))}
        {starRate > 0 && (
          <>
            <StarRateDiv>
              <div>{starRate}</div>
              <StarIcon size="25" rate={starRate} />
            </StarRateDiv>
            <BackButton
              onClick={() => {
                setStarRate(0);
              }}
            >
              <BsChevronRight />
            </BackButton>
          </>
        )}
      </StarWrapper> */}
      <CommentInput>
        <Input placeholder={t('message.message52')} width="100%" />
        <Button width="6.5rem">{t('publish')}</Button>
      </CommentInput>
      <CommentListDiv>
        <CommentContainer>
          <CommentInfoWrapper>
            <WriterInfoDiv>
              {/* <ProfileImageDiv /> */}
              <WriterDiv>
                <div>서태성</div>
                <span>4{t('minutesBefore')}</span>
              </WriterDiv>
            </WriterInfoDiv>
            <BiDotsVerticalRounded
              size="21"
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setShowToolIndex((prev) => (prev === 0 ? -1 : 0));
              }}
            />
          </CommentInfoWrapper>
          <ContentDiv>댓글 내용입니다.</ContentDiv>
          {showToolIndex === 0 && (
            <CommentToolWrapper>
              <div>
                <LuPenSquare />
                {t('modify')}
              </div>
              <div>
                <BiSolidTrash />
                {t('delete')}
              </div>
              {/* 
              내 댓글이 아닌경우?!
              <div>
                <PiFlagPennantFill />
                신고
              </div> */}
            </CommentToolWrapper>
          )}
        </CommentContainer>
      </CommentListDiv>
    </Container>
  );
}

export default Comment;
