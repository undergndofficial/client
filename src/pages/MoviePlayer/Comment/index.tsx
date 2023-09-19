import React, { useState } from 'react';
import {
  Container,
  StarWrapper,
  StarIcon,
  BackButton,
  StarRateDiv,
  CommentInput,
  CommentListDiv,
  WriterInfoDiv,
  ContentDiv,
  ProfileImageDiv,
  WriterDiv,
} from './style';
import { BsChevronRight } from 'react-icons/bs';
import { CommonButton, CommonInput } from 'styles/commonStyle';

function Comment() {
  const [starRate, setStarRate] = useState(0);

  return (
    <Container>
      <StarWrapper>
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
      </StarWrapper>
      <CommentInput>
        <CommonInput placeholder="댓글 내용을 작성해주세요." />
        <CommonButton width="6.5rem">게시</CommonButton>
      </CommentInput>
      <CommentListDiv>
        <div>
          <WriterInfoDiv>
            <ProfileImageDiv />
            <WriterDiv>
              <div>서태성</div>
              <span>4분 전</span>
            </WriterDiv>
          </WriterInfoDiv>
          <ContentDiv>댓글 내용입니다.</ContentDiv>
        </div>
      </CommentListDiv>
    </Container>
  );
}

export default Comment;
