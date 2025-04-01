import "./ItemsAsUser.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../Context/UserContext.jsx";


function Items() {
  const { userID, setUserID } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [itemsAsUserData, setItemsAsUserData] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
  if(userID != null && userID !== '')  {
      fetch(`http://localhost:3001/users/${userID}/items`)
      .then((res) => {
          console.log(res.status)
          return res.json()
      })
      .then((data) => {
        setLoading(false)
        setItemsAsUserData(data)
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.error('Error fetching data:', error);
  });
}
}, [userID]);

	return (
	<>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error}</p>
  ) : (
    <>
    <h1>Hi {itemsAsUserData.user.first_name} {itemsAsUserData.user.last_name}!</h1>
    <p>Here's your items:</p>
    <ul>
    {itemsAsUserData.items && itemsAsUserData.items.length > 0 ? (
      itemsAsUserData.items.map((item) => (
        <li key = {item.id}>
        {item.item_name} Description: {item.description} Quantity: {item.quantity}
      </li>
      ))
    ) : (
      <p>No items found.</p>
    )}
  </ul>
  </>
  )}
  </>
	)
}

export default Items;
