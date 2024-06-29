import React from 'react';
import './App.css';
import { Login } from './components/login';
import { Callback } from './components/callback'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
