import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Page.css";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm();

  const history = useHistory();

  const loginUser = (data) => {
    const user = {
      username: data.username,
      password: data.password
    }; 

    axios
      .post("/users/login", user)
      .then((response) => {
        history.push({
          pathname: "/board",
          state: { _id: response.data._id }
        });
      })
      .catch((error) => {
        if (error.response && error.response.status == 404) {
          setError("form", { message: "*Email or password is incorrect!" });
        } else {
          setError("form", { message: "*There was a server error processing your request. Please try again later." });
        }
      });
  };
  
  return (
    <div className="container d-block text-center justify-content-center">
      <h4 className="mb-3">Log In</h4>
      <form onSubmit={handleSubmit(loginUser)}>
        <p>{errors.form && errors.form.message}</p>
        <div className="form-group margin-b-0">
          <label className="text-left" htmlFor="username">
            Username
            <input
              type="text"
              {...register("username", { required: true })}
              className="form-control"
              id="username"
              placeholder="Username"
            />
            <p>{errors.username && "*Username is required"}</p>
          </label>
        </div>
        <div className="form-group margin-b-0">
          <label className="text-left" htmlFor="password">
            Password
            <input
              type="password"
              {...register("password", { required: true })}
              className="form-control"
              id="password"
              placeholder="Password"
            />
            <p>{errors.password && "*Password is required"}</p>
          </label>
        </div>
        <button type="submit" className="btn btn-primary" onClick={() => clearErrors()}>Log In</button>
        <div className="m-2">
          <Link to="/register" className="text-body">...or create a new account</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
