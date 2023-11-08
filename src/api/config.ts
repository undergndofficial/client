import axios from 'axios';
import humps from 'humps';

const instance = axios.create({
  baseURL: 'https://api.undergnd.com/',
});

// 요청 인터셉터
instance.interceptors.request.use(
  (config) => {
    // 폼데이터의 경우 카멜케이스로 바꾸면 에러가 발생
    if (!(config.data instanceof FormData)) {
      config.data = humps.decamelizeKeys(config.data);
    }
    // 헤더에 엑세스 토큰 담기
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      config.headers.Authorization = `Token ${accessToken}`;
      config.headers.refresh = `${refreshToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
instance.interceptors.response.use(
  (response) => {
    response.data = humps.camelizeKeys(response.data);
    return response;
  },
  async (error) => {
    const { config, response } = error;
    response.data = humps.camelizeKeys(response.data);
    //  401에러가 아닌 경우 그냥 에러 발생
    if (response.status !== 401 || config.sent) {
      return Promise.reject(error);
    }
    // 로그인 정보가 유효하지 않을 경우 (err_auth_002)
    // 사용자의 상태가 변경(탈퇴, 사용중지)되었을 경우 (err_mem_090)
    // 홈 화면으로 리다이렉트 후 에러 발생
    if (
      response.data.err.code === 'err_auth_002' ||
      response.data.err.code === 'err_mem_090'
    ) {
      // 토큰 삭제
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/';
      alert('로그인 상태가 만료되었습니다. 다시 로그인해주세요.');
      return Promise.reject(error);
    }
    // 아닌 경우 토큰 갱신
    config.sent = true; // 무한 재요청 방지
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    if (accessToken && refreshToken) {
      config.headers.Authorization = `Token ${accessToken}`;
      config.headers.refresh = `${refreshToken}`;
    }
    return axios(config);
  },
);

export default instance;
