import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HomePage, NewsPage } from './pages';
import { LayoutComponent } from './components';
import './index.css';

export const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <LayoutComponent>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news" element={<NewsPage />} />
        </Routes>
      </LayoutComponent>
    </Router>
  );
};
