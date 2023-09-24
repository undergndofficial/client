/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction, useState } from 'react';

type ReturnTypes<T = any> = [T, (e: any) => void, Dispatch<SetStateAction<T>>];

/**
 * input용 커스텀 훅..
 */
const useInput = <T = any>(initialData: T): ReturnTypes => {
  const [value, setValue] = useState(initialData);
  const handler = (e: any) => {
    setValue(e.target.value);
  };
  return [value, handler, setValue];
};

export default useInput;
