import React from 'react';
import { BrowserRouter } from 'react-router-dom';

interface AppProviderProps {
  children: React.ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => <BrowserRouter>{children}</BrowserRouter>;

export default AppProvider;
