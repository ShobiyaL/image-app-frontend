import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateImage from '../components/CreateImage';
import ImagesList from './ImagesList';
import { useNavigate } from 'react-router-dom';
const Home = ({ token }) => {
  const [show, setShow] = useState(false);
  // console.log(show);
  const navigate = useNavigate();
  let handleClick = () => {
    setShow(!show);
  };
  let handleLogout = () => {
    sessionStorage.removeItem('userToken');
    navigate('/');
  };
  return (
    <>
      <nav className='navbar bg-body-tertiary'>
        <div className='container'>
          <Link to='/home'>
            {' '}
            <span className='navbar-brand mb-0 h1'>GalleryApp</span>
          </Link>
          <div>
            <button
              className='float-left btn btn-outline-dark text-bold'
              onClick={handleClick}
            >
              {!show ? 'View-Images' : 'Create'}
            </button>{' '}
            <button
              className='float-left btn btn-dark ms-5'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Form to upload image */}
      <>
        {!show ? <CreateImage token={token} /> : <ImagesList token={token} />}
      </>
    </>
  );
};

export default Home;
