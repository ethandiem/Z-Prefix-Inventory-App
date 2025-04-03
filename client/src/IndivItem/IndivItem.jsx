import "./IndivItem.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function IndivItem() {
  const { userID, itemID } = useParams();
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const backButton = () => {
      navigate(-1);
  }

  useEffect(() => {
    fetch(`http://localhost:3001/items/${itemID}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch item details");
      }
      return res.json();
    })
    .then((data) => {
      setItem(data);
    })
    .catch((error) => {
      setError(error.message);
    });
}, [itemID]);

	return (
    <>
      {error ? (
        <p>Error: {error}</p>
      ) : !item ? (
        <p>Loading...</p>
      ) : (
        <div className = "specific-item-container">
          <h1 className = "specific-item-name">{item.item_name}</h1>
          <p className = "specific-item-description">Description: {item.description}</p>
          <p className = "specific-item-quantity">Quantity: {item.quantity}</p>
          <button onClick={backButton}>Back</button>
        </div>
      )}
    </>
  );
}

export default IndivItem;
