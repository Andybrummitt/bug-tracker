import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ repeatPassword, setRepeatPassword ] = useState('');
  const [ error, setError ] = useState('');

  const passwordIsValid = (password) => {
    if(password.length >= 6 && password.length <= 15){
      return true;
    }
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if(!passwordIsValid(password)){
      setError('Passwords must be between 6 and 15 characters.');
      return;
    }
    if(password !== repeatPassword){
      setError('Passwords do not match.');
      return;
    }
    axios
      .post(`/api/auth/register`, {
        username,
        email,
        password,
      })
      .then(user => {
        console.log('setting user to context', user)
      })
      .catch((err) => {
        console.log(err)
        setError(err.response.data);
      });
  }


  return (
    <div>
      <h1>Register</h1>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="username">
            <input
              type="username"
              id="username"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              maxLength={15}
            />
          </label>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="email">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              maxLength={50}
            />
          </label>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="password">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              maxLength={15}
            />
          </label>
        </div>
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="repeat-password">
            <input
              type="password"
              id="repeat-password"
              className="form-control"
              placeholder="Repeat Password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              maxLength={15}
            />
          </label>
        </div>

        <div className="row mb-4">
          <div className="col">
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-block mb-4">
          Sign in
        </button>

        <div className="text-center">
          <p>
            Already a member? <a href="#!">Login</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
