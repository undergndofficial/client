import React from 'react';
import Home from './pages/Home';
import GlobalStyle from 'styles/globalStyle';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MoviePlayer from 'pages/MoviePlayer';
import SearchResult from 'pages/SearchResult';
import Join from 'pages/Join';
import UserInfo from 'pages/UserInfo';

function App() {
  return (
    <div>
      <GlobalStyle />{' '}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/join" element={<Join />} />
          <Route path="/player/:id" element={<MoviePlayer />} />
          <Route path="/search/:keyword" element={<SearchResult />} />
          <Route path="/mypage" element={<UserInfo />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
