import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './LoginForm.css'

function LoginForm() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoLogin = e => {
    e.preventDefault();

    return dispatch(sessionActions.login({credential: 'Demo', password: 'password'}))
  }

  return (
    <div id='login-popup'>
      <form onSubmit={handleSubmit} id="login-form">
        <ul id='login-error-list'>
          {errors.map((error, idx) => (
            <li key={idx} className='login-form-errors'>{error}</li>
          ))}
        </ul>
        <div>
          <label>
            Username or Email
            <input
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
          <button type="submit">Log In</button>
      </form>
      <form onSubmit={demoLogin}>
            <button type='submit'>Demo</button>
      </form>
    </div>

  );
}

export default LoginForm;
