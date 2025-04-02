import "./Home.css";
import { Routes, Route, Link } from "react-router-dom";

function Home() {

	return (
	<>
      <h1 className = "title">Inventory Management</h1>
      <h3 className = "trusted">The App Trusted by Chad Alphason</h3>
      <p className = "login"><Link to = "/Login">Login</Link></p>
      <p className = "sign-up"><Link to = "/SignUp">Sign Up</Link></p>
      <p className = "inventory-as-guest"><Link to = "/Items">View List of All Inventories as a Guest</Link></p>
  </>
	)
}

export default Home;
