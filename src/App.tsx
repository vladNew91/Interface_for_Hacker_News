import React from 'react';
// import { Provider } from "react-redux";
// import { store } from "./modules";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { HomePage, NewsPage } from './pages';
import { LayoutComponent } from './components';
import './index.css';

export const App: React.FC = (): JSX.Element => {
  return (
    // <Provider store={store}>
      <Router>
        <LayoutComponent>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/news" element={<NewsPage />} />
          </Routes>
        </LayoutComponent>
      </Router>
    // </Provider>
  );
};
