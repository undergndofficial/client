import { useState } from 'react';
import { ResponseType } from 'types/common';

const useFetch = <T>(
  axiosRequest: (params?: object) => Promise<{ data: ResponseType<T> }>, // axios 함수
  initialValue: T, // 데이터 초기 값
) => {
  const [data, setData] = useState(initialValue);

  const fetchData = (params?: object) =>
    axiosRequest(params)
      .then((res) => {
        const { data } = res;
        if (data.st) {
          if (data.rs) {
            setData(data.rs);
          }
        }
      })
      .catch((e: Error) => {
        throw e;
      });

  return [data, fetchData, setData] as const;
  // [데이터, 데이터 요청, 데이터 설정]
};

export default useFetch;
