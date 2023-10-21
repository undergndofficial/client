import { ResponseType } from 'types/common';

const useRequest = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosRequest: (params?: any) => Promise<{ data: ResponseType<T> }>, // axios 함수
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestData = (params?: any) => {
    return new Promise(
      async (resolve: (value: T | boolean) => void, reject) => {
        try {
          const res = await axiosRequest(params);
          const { data } = res;
          if (data.st) {
            if (data.rs) {
              resolve(data.rs);
            } else {
              resolve(data.st);
            }
          } else {
            reject(new Error(data.err?.desc));
          }
        } catch (e) {
          reject(e);
        }
      },
    );
  };

  return requestData;
  // 데이터 요청 Promise
};

export default useRequest;
