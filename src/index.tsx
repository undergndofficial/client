import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import humps from 'humps';

// 요청 인터셉터
axios.interceptors.request.use(
  (config) => {
    if (!(config.data instanceof FormData)) {
      config.data = humps.decamelizeKeys(config.data);
    }
    // 헤더에 엑세스 토큰 담기
    const accessToken: string | null = localStorage.getItem('accessToken');
    const refreshToken: string | null = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      config.headers.Authorization = `Bearer Token ${accessToken}`;
      config.headers.refresh = `${refreshToken}`;
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
    const { data } = response;
    if (!data.st) {
      // 토큰이 만료된 경우 재발급된 accessToken을 받아 저장 후 재요청
      // if (data.err.code === 'err_auth_001') {
      //     const { accessToken, refreshToken } = data;
      //     localStorage.setItem('accessToken', accessToken);
      //     localStorage.setItem('refreshToken', refreshToken);
      //     return axios(response.config);
      // }
    }
    return response;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);
