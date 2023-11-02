/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useCallback, useState } from 'react';
import { isEmpty } from 'lodash';

type ReturnTypes = [
  string[],
  React.Dispatch<React.SetStateAction<string[]>>,
  (index: number) => void,
  (tag: string) => void,
  (e: any, string: string) => void,
];

const useTagInput = (
  setTag: React.Dispatch<string>,
  isComposing: boolean,
): ReturnTypes => {
  const [tagList, setTagList] = useState<string[]>([]);

  // 해당 인덱스의 태그 삭제
  const deleteTag = useCallback(
    (index: number) => {
      setTagList((prev) => prev.filter((_, i) => index !== i));
    },
    [tagList],
  );

  // 입력한 태그를 태그 리스트에 추가
  const addTag = useCallback(
    (tag: string) => {
      const addItem = tag.trim();
      if (isEmpty(addItem)) return;
      setTag('');
      setTagList((prev) => [addItem, ...prev]);
    },
    [tagList],
  );

  // 엔터키 눌렀을때도 태그 리스트에 추가
  const onKeyDownInput = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>, tag: string) => {
      if (isComposing) return;
      if (e.key === 'Enter') {
        e.preventDefault();
        addTag(tag);
      }
    },
    [tagList, isComposing],
  );

  return [tagList, setTagList, deleteTag, addTag, onKeyDownInput];
};

export default useTagInput;
