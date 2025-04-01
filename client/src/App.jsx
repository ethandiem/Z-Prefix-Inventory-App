import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import SignUp from "./Sign Up/SignUp";
import Items from "./Items/Items";

function App() {
	return (
	<>
      <Routes>
        <Route path='/' element={<Home />} />
				<Route path='/Login' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />} />
        <Route path='/Items/:id' element={<Items />} />
      </Routes>
  </>
	)
}

export default App;
