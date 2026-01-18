import axios from "axios";
import { useState } from "react";
const loginUser = async (credentials) => {
  const url = import.meta.env.VITE_SERVER_URL + "api/auth/login";
  const response = await axios.post(url, credentials);
  return response.data;
};

const Login = () => {
  let [count, setCount] = useState(0);
  const setCounter = (e) => {
    e.preventDefault();
    count === 0 ? (count = 1) : (count = 0);
  };
  const handleSumbtLogin = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const credentials = {
      username: formData.get("username"),
      password: formData.get("password"),
    };
    loginUser(credentials)
      .then((data) => {
        console.log("Login successful:", data);

        // Handle successful login (e.g., redirect, store token, etc.)
      })
      .catch((error) => {
        console.error("Login failed:", error);
      });
    console.log(credentials);
  };
  if (count == 0) {
    return (
      <div className="w-full h-full bg-slate-950 justify-center flex flex-row py-44">
        <form
          id="loginForm"
          action="none"
          onSubmit={handleSumbtLogin}
          className="w-1/3 pt-11 justify-center flex flex-row flex-wrap bg-slate-900 shadow-sm shadow-slate-800 rounded-lg"
        >
          <h2 className="w-full text-white text-xl text-center">Login</h2>
          <div className="relative bg-slate-100 w-8/12 h-10 rounded-lg">
            <i className="fas fa-user absolute text-md left-2 bottom-3"></i>
            <input
              className=" bg-transparent h-full w-11/12 float-right rounded-lg"
              type="text"
              id="login-username"
              name="username"
              placeholder="username"
              required
            />
          </div>
          <div className="relative bg-slate-100 w-8/12 h-10 rounded-lg">
            <i className="fas fa-lock absolute text-md left-2 bottom-3"></i>
            <input
              className="bg-transparent h-full w-11/12 float-right rounded-lg"
              type="password"
              id="login-password"
              name="password"
              placeholder="password"
              required
            />
          </div>
          <button
            className="w-8/12 bg-purple-800 text-xl text-white font-semibold rounded-md h-11"
            type="submit"
          >
            Login
          </button>
          <p className="text-white">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => {
                setCount(setCounter);
              }}
              className="underline "
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    );
  }
  if (count === 1) {
    return (
      <div className="w-full h-full bg-slate-950 justify-center flex flex-row py-44">
        <form id="registerForm" className="hidden">
          <h2>Register</h2>
          <div className="input-wrapper">
            <i className="fas fa-user"></i>
            <input
              type="text"
              id="register-username"
              name="username"
              placeholder="username"
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-envelope"></i>
            <input
              type="email"
              id="register-email"
              name="email"
              placeholder="email"
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="register-password"
              name="password"
              placeholder="password"
              required
            />
          </div>
          <div className="input-wrapper">
            <i className="fas fa-lock"></i>
            <input
              type="password"
              id="register-confirm-password"
              name="confirmPassword"
              placeholder="confirm password"
              required
            />
          </div>
          <button type="submit">Register</button>
          <p>
            Already have an account?
            <a href="#" onclick="showLogin();return false;">
              Login here
            </a>
          </p>
        </form>
      </div>
    );
  }
};

export default Login;
