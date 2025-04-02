import "./App.css";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
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
  </>
	)
}

export default App;
