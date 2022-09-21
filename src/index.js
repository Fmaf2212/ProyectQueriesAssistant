import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import '../src/BASE/Normalize.css';

import AnimatedRoutes from './COMPONENTS/AnimatedRoutes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
);

