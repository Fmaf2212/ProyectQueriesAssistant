import { Route, Routes, useLocation } from "react-router-dom";
import Login from '../PAGES/Login/Login';
import Queries from '../PAGES/Queries/Queries';

import { AnimatePresence } from 'framer-motion'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={ <Login /> } />
            <Route path="/Queries" element={<Queries />} />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
