import { ResponseType } from 'types/common';
import { CustomError } from 'utils/error';

const useRequest = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  axiosRequest: (params?: any) => Promise<{ data: ResponseType<T> }>, // axios 함수
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const requestData = (params?: any) => {
    return new Promise(async (resolve: (value: T) => void, reject) => {
      try {
        const res = await axiosRequest(params);
        const { data } = res;
        if (data.st) {
          if (data.rs) {
            resolve(data.rs);
          } else {
            resolve(data.st as T);
          }
        } else {
          const errorMessage = data.err?.desc || '';
          const errorCode = data.err?.code || 'err_default';
          reject(new CustomError(errorMessage, errorCode));
        }
      } catch (e) {
        alert('서비스에 오류가 발생하였습니다.');
      }
    });
  };

  return requestData;
  // 데이터 요청 Promise
};

export default useRequest;
