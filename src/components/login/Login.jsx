import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const loginUser = async (credentials) => {
  const url = import.meta.env.VITE_SERVER_URL + "api/auth/login";
  const response = await axios.post(url, credentials);
  return response.data;
};

const registerUser = async (credentials) => {
  const url = import.meta.env.VITE_SERVER_URL + "api/auth/register";
  const response = await axios.post(url, credentials);
  return response.data;
};

const Login = () => {
  const navigate = useNavigate();
  let [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  let [error, setError] = useState("");
  let [registerDetails, setRegisterDetails] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  let [mode, setMode] = useState(true);
  useEffect(() => {
    return () => setError("");
  }, [mode]);
  const loginButtonClick = () => {
    setMode(false);
  };

  const registerButtonClick = () => {
    setMode(true);
  };
  const register = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    let credentials;
    if (
      formData.get("password") === formData.get("confirmPassword") &&
      typeof formData.get("password") === "string"
    ) {
      credentials = {
        username: formData.get("username"),
        password: formData.get("password"),
        email: formData.get("email"),
        confirmPassword: formData.get("confirmPassword"),
      };
      registerUser(credentials)
        .then((data) => {
          console.log(data.message);
          setMode(true);
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setError(err.response.data.message);
        });
    } else {
      console.log("Password miss Match");
    }
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
        console.log("Login successful:", data.status);

        navigate("/home");
      })
      .catch((err) => {
        console.error("Login failed:", err.response.data);
        setError(err.response.data.message);
      });
  };
  if (mode == true) {
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
              value={loginDetails.username}
              onChange={(e) => {
                setLoginDetails({ ...loginDetails, username: e.target.value });
              }}
              className=" bg-transparent h-full w-full pl-8 float-right rounded-lg"
              type="text"
              id="login-username"
              name="username"
              autoComplete="username"
              placeholder="username"
              required
            />
          </div>
          <div className="relative bg-slate-100 w-8/12 h-10 rounded-lg">
            <i className="fas fa-lock absolute text-md left-2 bottom-3"></i>
            <input
              value={loginDetails.password}
              onChange={(e) => {
                setLoginDetails({ ...loginDetails, password: e.target.value });
              }}
              className="bg-transparent h-full w-full pl-8 float-right rounded-lg"
              type="password"
              id="login-password"
              name="password"
              autoComplete="current-password"
              placeholder="password"
              required
            />
          </div>
          <h1 className="text-amber-500">{error}</h1>
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
                loginButtonClick();
              }}
              className="underline "
            >
              Register here
            </button>
          </p>
        </form>
      </div>
    );
  } else if (mode == false) {
    return (
      <div className="w-full h-full bg-slate-950 justify-center flex flex-row py-44">
        <form
          id="registerForm"
          onSubmit={register}
          action="none"
          className="w-1/3 pt-11 justify-center flex flex-row flex-wrap bg-slate-900 shadow-sm shadow-slate-800 rounded-lg"
        >
          <h2 className="w-full text-white text-xl text-center">Register</h2>
          <div className="relative bg-slate-100 w-8/12 h-10 rounded-lg">
            <i className="fas fa-user absolute text-md left-2 bottom-3"></i>
            <input
              value={registerDetails.username}
              onChange={(e) => {
                setRegisterDetails({
                  ...registerDetails,
                  username: e.target.value,
                });
              }}
              className="bg-transparent h-full w-full pl-8 float-right rounded-lg"
              type="text"
              id="register-username"
              name="username"
              autoComplete="username"
              placeholder="username"
              required
            />
          </div>
          <div className="relative bg-slate-100 w-8/12 h-10 rounded-lg">
            <i className="fas fa-envelope absolute text-md left-2 bottom-3"></i>
            <input
              value={registerDetails.email}
              onChange={(e) => {
                setRegisterDetails({
                  ...registerDetails,
                  email: e.target.value,
                });
              }}
              className="bg-transparent h-full w-full pl-8 float-right rounded-lg"
              type="email"
              id="register-email"
              name="email"
              placeholder="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="relative bg-slate-100 w-8/12 h-10 rounded-lg">
            <i className="fas fa-lock absolute text-md left-2 bottom-3"></i>
            <input
              value={registerDetails.password}
              onChange={(e) => {
                setRegisterDetails({
                  ...registerDetails,
                  password: e.target.value,
                });
              }}
              className="bg-transparent h-full w-full pl-8 float-right rounded-lg"
              type="password"
              id="register-password"
              name="password"
              placeholder="password"
              autoComplete="new-password"
              required
            />
          </div>
          <div className="relative bg-slate-100 w-8/12 h-10 rounded-lg">
            <i className="fas fa-lock absolute text-md left-2 bottom-3"></i>
            <input
              value={registerDetails.confirmPassword}
              onChange={(e) => {
                setRegisterDetails({
                  ...registerDetails,
                  confirmPassword: e.target.value,
                });
              }}
              className="bg-transparent h-full w-full pl-8 float-right rounded-lg"
              type="password"
              id="register-confirm-password"
              name="confirmPassword"
              placeholder="confirm password"
              required
              autoComplete="new-password"
            />
          </div>
          <button
            type="submit"
            className="w-8/12 bg-purple-800 text-xl text-white font-semibold rounded-md h-11"
          >
            Register
          </button>

          <h1 className="text-red-600 w-8/12 text-sm text-center">{error}</h1>

          <p className="text-white">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => {
                registerButtonClick();
              }}
              className="underline"
            >
              Login here
            </button>
          </p>
        </form>
      </div>
    );
  }
};

export default Login;
