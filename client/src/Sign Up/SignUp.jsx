import "./SignUp.css";
import { Routes, Route, Link } from "react-router-dom";

function SignUp() {

	return (
	<>
      <form onSubmit={handleLogin}>
      {loginFailed && <p className="failed">Login failed. Please try again.</p>}
      {loginSuccess && <p className="success">Login successful!</p>}
      <div>
        <input
          type = "text"
          value = {username}
          onChange = {(e) => setUsername(e.target.value)}
          placeholder = "Enter your username"
          />
      </div>
      <div>
        <input
          type = "password"
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          placeholder = "Enter your password"
        />
      </div>
      <button type = "submit" className = "login-button">Login</button>
    </form>
      <Link to = "/Login">Already have an Account? Login Here</Link>
  </>
	)
}

export default SignUp;
