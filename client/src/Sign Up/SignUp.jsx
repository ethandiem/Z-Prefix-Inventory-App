import "./SignUp.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../Context/UserContext.jsx";

function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [signUpFailed, setSignUpFailed] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const { setUserID } = useContext(UserContext);
  const navigate = useNavigate();

  const addUser = (e) => {
    e.preventDefault();

    if(!firstName, !lastName, !username, !password) {
      alert("Please fill all fields")
    } else {

    console.log("Sending to server:", {
      first_name: firstName,
      last_name: lastName,
      username: username,
      password: password,
    });

      fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: String(firstName || '').trim(),
          last_name: String(lastName || '').trim(),
          username: String(username || '').trim(),
          password: String(password || '').trim(),
        }),
    })
        .then(response => response.json())
        .then((data) => {
          setSignUpSuccess(true)
          setSignUpFailed(false)
          setUserID(data.id)
            console.log('Successfully Signed Up:', data);
            navigate(`/Login`);
            alert("Thanks for Signing Up! Login to Start Adding Inventory")
          })
        .catch((error) => {
          setSignUpSuccess(false)
          setSignUpFailed(true)
            console.error('Error Signing Up:', error);
        });
};
  }

	return (
	<>
    <div className = "sign-up-screen">
      <h1>Sign Up</h1>
      <form onSubmit={addUser}>
      {signUpFailed && <p className="failed">Sign Up failed. Please try again later.</p>}
      {signUpSuccess && <p className="success">Sign Up successful!</p>}
      <div>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="sign-up-button">Sign Up!</button>
    </form>
      <Link to = "/Login" className = "login-from-sign-up">Already have an Account? Login Here</Link>
  </div>
  </>
	)
}

export default SignUp;
