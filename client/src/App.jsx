import "./App.css";
import { useContext } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./Sign Up/SignUp";
import Items from "./Items/Items";
import ItemsAsUser from "./ItemsAsUser/ItemsAsUser";
import { UserContext } from "./Context/UserContext.jsx";
import AddItem from "./AddItem/AddItem.jsx";
import IndivItem from "./IndivItem/IndivItem.jsx";

function App() {
	const { userID, setUserID } = useContext(UserContext);
  const location = useLocation();

	return (
	<>
      <Routes>
        <Route path='/' element={<Home />} />
				<Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
				<Route path='/Items' element={<Items />} />

        <Route path='/Items/User/:id' element={<ItemsAsUser />} />

        <Route path="/Items/:id/Add" element={<AddItem />} />
        <Route path='/Items/:id/:itemID' element={<IndivItem />} />
        <Route path='/Items/:itemID' element={<IndivItem />} />
      </Routes>

    <div className = "navbar">
      <Link to = {`/`} className = "home">Home</Link>
      <p className = "all-inventory"><Link to = "/Items">View List of All Items</Link></p>
      {/* {userID === "" && location.pathname !== "/Login" && location.pathname !== "/SignUp" &&  */}
      {userID === "" && <Link to = {`/SignUp`}className = "sign-up">Sign Up</Link>}

      {userID !== "" && <Link to = {`/Items/User/${userID}`} className = "my-inventory">My Inventory</Link>}

      {userID !== "" && <Link to = "/" onClick={() => {setUserID('')}} className = "sign-out">Sign Out</Link>}
      {/* {userID === "" && location.pathname !== "/Login" && location.pathname !== "/SignUp" &&  */}
      {userID === "" && <Link to = {`/Login`} className = "login">Login</Link>}

    </div>
  </>
	)
}

export default App;
