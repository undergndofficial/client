import React from 'react';
import Home from './pages/Home';
import GlobalStyle from 'styles/globalStyle';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MoviePlayer from 'pages/MoviePlayer';

function App() {
  return (
    <div>
      <GlobalStyle />{' '}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/player" element={<MoviePlayer />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
