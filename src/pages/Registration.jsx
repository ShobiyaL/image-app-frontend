import React, { useState } from 'react';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registration = () => {
  const navigate = useNavigate();
  let initialInputs = {
    username: '',
    email: '',
    password: '',
  };
  const [inputs, setInputs] = useState(initialInputs);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  let handleChange = (event) => {
    console.log(event.target.value);
    setInputs((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://image-app-backend.onrender.com/api/users/register',
        inputs
      );
      console.log(response, ' response check...register');
      let token = response.data.data.token;
      sessionStorage.setItem('userToken', token);
      setInputs(initialInputs);
      setIsLoading(false);
      setError('');
      if (response.data.status === 'success') {
        navigate('/home');
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data);
    }
  };

  return (
    <div className='form-container'>
      <form className='mx-auto' onSubmit={handleSubmit}>
        <div className='mb-3 text-center'>
          <h4>Create Account</h4>
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputText' className='form-label'>
            Username
          </label>
          <input
            type='text'
            className='form-control'
            id='exampleInputText'
            aria-describedby='emailHelp'
            value={inputs.username}
            name='username'
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            aria-describedby='emailHelp'
            value={inputs.email}
            name='email'
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' class='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            id='exampleInputPassword1'
            value={inputs.password}
            name='password'
            onChange={handleChange}
          />
        </div>

        <button type='submit' className='btn btn-primary  mt-4'>
          {isLoading ? (
            <div class='spinner-border text-light mx-auto' role='status'>
              <span class='visually-hidden'>Loading...</span>
            </div>
          ) : (
            ' '
          )}{' '}
          Register
        </button>

        <div className='mt-4 text-center'>
          Or{' '}
          <b>
            <Link to='/'>Login</Link>
          </b>
        </div>
      </form>
    </div>
  );
};

export default Registration;
