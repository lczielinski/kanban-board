import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors
  } = useForm();

  const history = useHistory();

  const registerUser = (data) => {
    const user = {
      name: data.name,
      username: data.username,
      password: data.password
    }; 

    axios
      .post("/users/register", user)
      .then(() => {
        history.push("/login");
      })
      .catch((error) => {
        if (error.response && error.response.status == 409) {
          setError("form", { message: "*Username already taken" });
        } else {
          setError("form", { message: "*There was a server error processing your request. Please try again later." });
        }
      });
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5 text-center">
      <h4 className="mb-2">Register</h4>
      <form onSubmit={handleSubmit(registerUser)}>
        <p>{errors.form && errors.form.message}</p>
        <div className="form-group">
          <label className="text-start" htmlFor="name">
            Name
            <input
              type="text"
              {...register("name", { required: true })}
              className="form-control"
              id="name"
              placeholder="Name"
            />
            <p>{errors.name && "*Name is required"}</p>
          </label>
        </div>
        <div className="form-group">
          <label className="text-start" htmlFor="username">
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
        <div className="form-group">
          <label className="text-start" htmlFor="password">
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
        <button type="submit" className="btn btn-primary" onClick={() => clearErrors()}>Register</button>
        <div className="m-2">
          <Link to="/" className="text-body text-decoration-none">...or log in</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
