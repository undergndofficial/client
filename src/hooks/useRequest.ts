import { ResponseType } from 'types/common';
import { CustomError } from 'utils/error';
import { useNavigate } from 'react-router-dom';

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
          // 로그인 정보가 유효하지 않을 경우 (err_auth_002)
          // 사용자의 상태가 변경(탈퇴, 사용중지)되었을 경우 (err_mem_090)
          // 홈 화면으로 리다이렉트 후 에러 발생
          if (errorCode === 'err_auth_002' || errorCode === 'err_mem_090') {
            // 토큰 삭제
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            const navigate = useNavigate();
            navigate('/');
          }
          reject(new CustomError(errorMessage, errorCode));
        }
      } catch (e) {
        reject(e);
      }
    });
  };

  return requestData;
  // 데이터 요청 Promise
};

export default useRequest;
