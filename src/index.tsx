import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import axios from 'axios';
import humps from 'humps';

// 요청 인터셉터
axios.interceptors.request.use(
  function (config) {
    config.data = humps.decamelizeKeys(config.data);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
axios.interceptors.response.use(function (response) {
  response.data = humps.camelizeKeys(response.data);
  return response;
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(<App />);
