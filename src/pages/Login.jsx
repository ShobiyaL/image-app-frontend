import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  let initialInputs = { email: '', password: '' };
  const [inputs, setInputs] = useState(initialInputs);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // console.log(inputs);
  let handleChange = (event) => {
    setInputs((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        'http://localhost:8002/api/users/login',
        inputs
      );
      console.log(response, ' response check...register');
      // console.log(response.data.data.token);

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
      setError(error.response.data.message);
    }
  };

  return (
    <div className='form-container'>
      <form className='mx-auto' onSubmit={handleSubmit}>
        <div className='mb-3 text-center'>
          <h4>Welcome Back!</h4>
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputEmail1' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='exampleInputEmail1'
            name='email'
            value={inputs.email}
            onChange={handleChange}
            aria-describedby='emailHelp'
          />
        </div>
        <div className='mb-3'>
          <label htmlFor='exampleInputPassword1' className='form-label'>
            Password
          </label>
          <input
            type='password'
            className='form-control'
            name='password'
            value={inputs.password}
            onChange={handleChange}
            id='exampleInputPassword1'
          />
        </div>

        <button type='submit' className='btn btn-primary mt-4'>
          {isLoading ? (
            <div class='spinner-border text-light' role='status'>
              <span class='visually-hidden'>Loading...</span>
            </div>
          ) : (
            ' '
          )}{' '}
          Login
        </button>
        <div className='mt-4 text-center'>
          <p>
            Don't have an account?{' '}
            <b>
              <Link to='/register'>Register Here!</Link>
            </b>
          </p>
        </div>
        {error ? <h4>OOPS!..{error} Try Again..</h4> : ''}
      </form>
    </div>
  );
};

export default Login;
