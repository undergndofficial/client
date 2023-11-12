import React from 'react';
import GlobalStyle from 'styles/globalStyle';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import Home from './pages/Home';
// import MoviePlayer from 'pages/MoviePlayer';
// import SearchResult from 'pages/SearchResult';
// import Join from 'pages/Join';
// import UserInfo from 'pages/UserInfo';
// import RequestMovie from 'pages/RequestMovie';
// import Request from 'pages/RequestMovie/Request';
// import Register from 'pages/RequestMovie/Register';
// import Notice from 'pages/Notice';
// import NoticeDetail from 'pages/Notice/Detail';
// import CustomerCenter from 'pages/CustomerCenter';
// import Inquiry from 'pages/Inquiry';
// import InquiryDetail from 'pages/Inquiry/Detail';
// import WriteInquiry from 'pages/Inquiry/Write';
// import PrivateRoute from 'layouts/PrivateRoute';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Festival from 'pages/Festival';
import FestivalPlayer from 'pages/FestivalPlayer';

function App() {
  return (
    <div>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Festival />} />
          <Route path="/player/:id" element={<FestivalPlayer />} />
          {/* <Route path="/" element={<Home />} />
          <Route path="/player/:id" element={<MoviePlayer />} />
          <Route path="/search/:keyword" element={<SearchResult />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/notice/:id" element={<NoticeDetail />} />
          <Route path="/customer" element={<CustomerCenter />} />*/}
          <Route path="*" element={<Navigate to="/" />} />
          {/* 인증을 안해야지만 접속 가능한 페이지 */}
          {/* <Route element={<PrivateRoute userAuthentication={false} />}>
            <Route path="/join" element={<Join />} />
          </Route> */}
          {/* 인증을 해야만 접속 가능한 페이지 */}
          {/* <Route element={<PrivateRoute userAuthentication={true} />}>
            <Route path="/mypage" element={<UserInfo />} />
            <Route path="/request-movie" element={<RequestMovie />} />
            <Route path="/request-movie/requset" element={<Request />} />
            <Route path="/request-movie/register" element={<Register />} />
            <Route path="/inquiry/write" element={<WriteInquiry />} />
            <Route path="/inquiry/write/:id" element={<WriteInquiry />} />
            <Route path="/inquiry" element={<Inquiry />} />
            <Route path="/inquiry/:id" element={<InquiryDetail />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Flip}
      />
    </div>
  );
}

export default App;
