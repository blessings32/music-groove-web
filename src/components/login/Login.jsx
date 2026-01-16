import axios from "axios";

const loginUser = async (credentials) => {
	const url = import.meta.env.VITE_SERVER_URL + "api/auth/login";
    const response = await axios.post(url, credentials);
    return response.data;
 
};

const Login = () => {
	const handleSumbtLogin = async (event) => { 
		    event.preventDefault();
		    const form = event.target;
		    const formData = new FormData(form);
		    const credentials = {
		      username: formData.get("username"),
		      password: formData.get("password"),
		    };
		    loginUser(credentials).then((data) => {
		      console.log("Login successful:", data);
		      // Handle successful login (e.g., redirect, store token, etc.)
		    }).catch((error) => {
		      console.error("Login failed:", error);
		    });
		    console.log(credentials);
	}
    return (<>
    <form id="loginForm" action="none" onSubmit={handleSumbtLogin}>
      <h2>Login</h2>
      <div className="input-wrapper">
        <i className="fas fa-user"></i>
        <input
          type="text"
          id="login-username"
          name="username"
          placeholder="username"
          required
        />
      </div>
      <div className="input-wrapper">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          id="login-password"
          name="password"
          placeholder="password"
          required
        />
      </div>
      <button type="submit">Login</button>
      <p>
        Don't have an account?
        <a href="#" onclick="showRegister();return false;">Register here</a>
      </p>
    </form>
    <form id="registerForm">
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
        <a href="#" onclick="showLogin();return false;">Login here</a>
      </p>
    </form>
    </>)
  };


export default Login;