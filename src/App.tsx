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
import Notice from 'pages/Notice';
import Detail from 'pages/Notice/Detail';
import CustomerCenter from 'pages/CustomerCenter';
import Inquiry from 'pages/Inquiry';
import WriteInquiry from 'pages/Inquiry/Write';

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
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<Detail />} />
          <Route path="/customer" element={<CustomerCenter />} />
          <Route path="/inquiry" element={<Inquiry />} />
          <Route path="/inquiry/write" element={<WriteInquiry />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
