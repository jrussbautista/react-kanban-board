import React from 'react';
import { Routes, Route } from 'react-router-dom';

import AppProvider from './app/AppProvider';
import Layout from './app/Layout';
import Board from './features/Board';
import Settings from './features/Settings';

const App = () => (
  <AppProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  </AppProvider>
);

export default App;
