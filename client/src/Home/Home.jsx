import "./Home.css";
import { Routes, Route, Link } from "react-router-dom";

function Home() {

	return (
	<>
      <p className = "login"><Link to = "/Login">Login</Link></p>
      <p className = "sign-up"><Link to = "/SignUp">Sign Up</Link></p>
  </>
	)
}

export default Home;
