import React from 'react';
import Home from './pages/Home';
import GlobalStyle from 'styles/globalStyle';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MoviePlayer from 'pages/MoviePlayer';
import SearchResult from 'pages/SearchResult';
import Join from 'pages/Join';
import UserInfo from 'pages/UserInfo';
import RequestMovie from 'pages/RequestMovie';
import Request from 'pages/RequestMovie/Request';
import Register from 'pages/RequestMovie/Register';

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
          <Route path="/request-movie" element={<RequestMovie />} />
          <Route path="/request-movie/requset" element={<Request />} />
          <Route path="/request-movie/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
