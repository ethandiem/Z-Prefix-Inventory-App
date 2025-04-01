import "./Login.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);


const handleLogin = async (e) => {
  e.preventDefault();

  if (!username || !password) {
    alert("Please fill in both fields.");
    setLoginFailed(true);
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
  setLoginFailed(false);
  console.log("Login successful:", data);
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
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <button type="submit">Login</button>
    </form>
      <Link to = "/SignUp">Don't have an Account? Sign Up Here</Link>
  </>
	)
}

export default Login;
