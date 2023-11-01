import React from 'react';
import { TagDiv, TagListDiv } from './style';

/*
 * 태그 인풋에 사용되는 태그 목록
 */
function InputTagList({
  tagList,
  deleteTag,
}: {
  tagList: string[];
  deleteTag: (index: number) => void;
}) {
  return (
    <TagListDiv>
      {tagList.map((t, i) => (
        <TagDiv key={i}>
          {t}
          <div
            onClick={() => {
              deleteTag(i);
            }}
          >
            &times;
          </div>
        </TagDiv>
      ))}
    </TagListDiv>
  );
}

export default InputTagList;
