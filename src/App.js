import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './pages/Login';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Registration from './pages/Registration';
import Home from './pages/Home';
import ImagesList from './pages/ImagesList';

function App() {
  const [token, setToken] = useState(sessionStorage.getItem('userToken'));
  console.log(token);
  useEffect(() => {
    const token = sessionStorage.getItem('userToken');
    console.log(token, 'inside useeffect');
    if (token) {
      setToken(token);
    } else {
      setToken('');
    }
  }, []);
  console.log(token);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/home' element={<Home token={token} />} />
          <Route path='/images' element={<ImagesList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
