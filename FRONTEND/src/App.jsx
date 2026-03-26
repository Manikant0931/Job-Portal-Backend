import React from 'react'
import FunctionalComponent from './components/FunctionalComponent';
import ClassComponents from './components/ClassComponents';
import FatchData from './components/pages/AllJobs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FavoriteJobs from './components/pages/FavoriteJobs';
import About from './components/pages/About';
import AllJobs from './components/pages/AllJobs';
import Navbar from './components/pages/Navbar';

export default function App() {

  return (
    <div>
      
    <BrowserRouter>
    <Navbar/>
    <Routes>
        <Route path="/" element={<AllJobs />} />
        <Route path="/favorites" element={<FavoriteJobs />} />
        <Route path="/about" element={<About />} />
    </Routes>
    </BrowserRouter>


    </div>
  )
}

