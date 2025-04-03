import "./Home.css";
import { Routes, Route, Link } from "react-router-dom";

function Home() {

	return (
	<>
    <div className = "home-page">
      <h1 className = "title">Inventory Management</h1>
      <h3 className = "trusted">The App Trusted by Dr. Doofenshmirtz</h3>
      <p className = "description">
        The Inventory Management Application is an app
        designed to help inventory managers efficiently manage their inventory.
        Whether you're a small business owner or someone who wants to keep track of personal items,
        this app provides a solution for individuals in need of inventory management.
      </p>
      {/* <p className = "login"><Link to = "/Login">Login</Link></p>
      <p className = "sign-up"><Link to = "/SignUp">Sign Up</Link></p> */}
      {/* <p className = "inventory-as-guest"><Link to = "/Items">View List of All Inventories as a Guest</Link></p> */}
    </div>
  </>
	)
}

export default Home;
