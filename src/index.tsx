import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import humps from 'humps';

// 임시
const REFRESH_URL = 'refresh';

// 액세스 토큰 재발급
const refreshToken = async (): Promise<null | string | void> => {
  try {
    // refresh 요청 추가
    const accessToken = null;
    // refresh 요청 성공
    // localStorage.setItem('accessToken', accessToken);
    // 실패
    localStorage.removeItem('accessToken');
    return accessToken;
  } catch (e) {
    localStorage.removeItem('accessToken');
  }
};

// 요청 인터셉터
axios.interceptors.request.use(
  (config) => {
    config.data = humps.decamelizeKeys(config.data);
    // 헤더에 엑세스 토큰 담기
    if (!config.headers) return config;
    const token: string | null = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axios.interceptors.response.use(
  (response) => {
    response.data = humps.camelizeKeys(response.data);
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    // 리프레시 요청이나 401에러가 아닌 경우 그냥 에러 발생
    if (config.url === REFRESH_URL || status !== 401 || config.sent) {
      return Promise.reject(error);
    }
    // 아닌 경우 토큰 갱신
    config.sent = true; // 무한 재요청 방지
    const token = refreshToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return axios(config);
  },
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);
