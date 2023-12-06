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
  const [token, setToken] = useState(null);
  console.log(token);
  useEffect(() => {
    const storedToken = sessionStorage.getItem('userToken');
    setToken(storedToken);
    console.log(token, 'inside useeffect');
  }, [token]);
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
