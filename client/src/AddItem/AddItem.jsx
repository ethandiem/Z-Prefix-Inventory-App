import "./AddItem.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../Context/UserContext.jsx";

function AddItem() {
  const { userID, setUserID } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [itemsAsUserData, setItemsAsUserData] = useState(null);
  const [error, setError] = useState(null);
  const [itemName, setItemName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [addItemFailed, setAddItemFailed] = useState(false);
  const [addItemSuccess, setAddItemSuccess] = useState(false);
  const navigate = useNavigate();

const backButton = () => {
    navigate(-1);
}

const addItem = (e) => {
  e.preventDefault();

  if(!itemName, !description, !quantity) {
    alert("Please fill all fields")
  } else {

  console.log("Sending to server:", {
    user_id: userID,
    item_name: itemName,
    description: description,
    quantity: quantity,
  });

    fetch('http://localhost:3001/items', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: Number(userID),
        item_name: String(itemName || '').trim(),
        description: String(description || '').trim(),
        quantity: Number(quantity),
      }),
  })
      .then(response => response.json())
      .then((data) => {
        setAddItemSuccess(true)
        setAddItemFailed(false)
          console.log('Successfully Added Item:', data);
          navigate(`/Items/User/${userID}`);
          alert("Added Item to Inventory!")
        })
      .catch((error) => {
        setAddItemSuccess(false)
        setAddItemFailed(true)
          console.error('Error Adding Item:', error);
      });
  };
}

return (
  <>
    <h1>Add Item</h1>
      <form onSubmit={addItem}>
      {addItemFailed && <p className="failed">Item add failed. Please try again later.</p>}
      {addItemSuccess && <p className="success">Item Add Successful!</p>}
        <div>
          <input
            type="text"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <button type="submit" className="sign-up-button">Add</button>
    </form>
    <button onClick={backButton}>Back</button>
  </>
  )
}

export default AddItem;