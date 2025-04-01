import "./Login.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const { userID, setUserID } = useContext(UserContext);
  const navigate = useNavigate();


const handleLogin = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    setLoginFailed(true);
    alert("Please fill in both fields.");
    return;

  } try {

  const res = await fetch("http://localhost:3001/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ username, password }),
});

const data = await res.json();

if (res.ok) {
  setLoginSuccess(true);
  setUserID(data.user.id);
  setLoginFailed(false);
  console.log("Login successful:", data);
  navigate(`/Items/${data.user.id}`);
} else {
  setLoginFailed(true);
  setLoginSuccess(false);
}
} catch (error) {
console.error("Error during login:", error);
setLoginFailed(true);
setLoginSuccess(false);
}
};


	return (
	<>
    <h1>Login</h1>
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
      <Link to = "/SignUp">Don't have an Account? Sign Up Here</Link>
  </>
	)
}

export default Login;
