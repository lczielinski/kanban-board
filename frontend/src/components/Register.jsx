import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Page.css';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerUser = (data) => {
    const user = {
      name: data.name,
      username: data.username,
      password: data.password
    }; 

    axios
      .post('http://localhost:4000/users/register', user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container d-block text-center justify-content-center">
      <h4 className="mb-3">Register</h4>
      <form onSubmit={handleSubmit(registerUser)}>
      <div className="form-group margin-b-0">
          <label className="text-left" htmlFor="name">
            Name
            <input
              type="text"
              {...register('name', { required: true })}
              className="form-control"
              id="name"
              placeholder="Name"
            />
            <p>{errors.name && '*Name is required'}</p>
          </label>
        </div>
        <div className="form-group margin-b-0">
          <label className="text-left" htmlFor="username">
            Username
            <input
              type="text"
              {...register('username', { required: true })}
              className="form-control"
              id="username"
              placeholder="Username"
            />
            <p>{errors.username && '*Username is required'}</p>
          </label>
        </div>
        <div className="form-group margin-b-0">
          <label className="text-left" htmlFor="password">
            Password
            <input
              type="password"
              {...register('password', { required: true })}
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <p>{errors.password && '*Password is required'}</p>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <div className="m-2">
          <Link to="/" className="text-body">...or log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
