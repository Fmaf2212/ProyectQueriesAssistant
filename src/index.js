import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './index.css';
import Login from './PAGES/Login/Login';
import Queries from './PAGES/Queries/Queries';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Queries" element={<Queries />} />
      </Routes>
    </BrowserRouter>
);

