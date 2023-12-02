import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Layout/Home/Home';
import NavBar from './Layout/NavBar/NavBar';

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
