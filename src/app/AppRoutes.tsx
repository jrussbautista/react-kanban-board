import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Board from '../features/Board';
import Settings from '../features/Settings';

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
