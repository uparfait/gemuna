import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import PlayGamePage from './pages/play_game.jsx';
import SearchyPage from './pages/searchy.jsx';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="play" element={<PlayGamePage />} />
          <Route path="search" element={<SearchyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
