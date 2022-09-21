import { Route, Routes, useLocation } from "react-router-dom";
import Login from '../PAGES/Login';
import Queries from '../PAGES/Queries';

import { AnimatePresence } from 'framer-motion/dist/framer-motion'

const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Login />} />
            <Route path="/Queries" element={<Queries />} />
        </Routes>
    </AnimatePresence>
  )
}

export default AnimatedRoutes
