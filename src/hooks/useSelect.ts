import { useCallback, Dispatch, SetStateAction, useState } from 'react';
import { SingleValue } from 'react-select';

type ReturnTypes = [
  { label: string; value: string }[],
  Dispatch<SetStateAction<{ label: string; value: string }[]>>,
  (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>,
  ) => void,
];

/**
 * select용 커스텀 훅..
 */
const useSelect = (
  setOption?: (value: { label: string; value: string }) => void,
): ReturnTypes => {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    [],
  );
  // 옵션 변경 핸들러
  const onChangeOption = useCallback(
    (newValue: SingleValue<{ label: string; value: string }>) => {
      if (setOption && newValue) {
        setOption(newValue);
      }
    },
    [],
  );
  return [options, setOptions, onChangeOption];
};

export default useSelect;
