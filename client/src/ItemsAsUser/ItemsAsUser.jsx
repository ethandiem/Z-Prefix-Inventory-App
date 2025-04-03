import "./ItemsAsUser.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { UserContext } from "../Context/UserContext.jsx";


function Items() {
  const { userID, setUserID } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [itemsAsUserData, setItemsAsUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItems, setEditedItems] = useState([]);
  const [showingDelete, setShowingDelete] = useState(null)

  useEffect(() => {
  if(userID)  {
    console.log("Fetching items for userID:", userID);
      fetch(`http://localhost:3001/users/${userID}/items`)
      .then((res) => {
          console.log(res.status)
          return res.json()
      })
      .then((data) => {
        console.log("Fetched items data:", data);
        setLoading(false)
        setItemsAsUserData(data)
        setEditedItems(data.items || []);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
        console.error('Error fetching data:', error);
  });
}
}, [userID]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...editedItems];
    updatedItems[index][field] = value;
    setEditedItems(updatedItems)
  }

  const handleSave = () => {
    editedItems.forEach((item) => {
      fetch(`http://localhost:3001/items`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      })
      .then((res) => {
        console.log(res.status)
          return res.json()
        })
        .then((data) => {
          console.log("Item updated successfully:", data);
        })
        .catch((error) => {
          console.error("Error updating item:", error);
        });
    });

    setIsEditing(false);
  };

  const removeFromInventory = (indexToRemove, itemId) => {
    fetch(`http://localhost:3001/items/${itemId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete item");
        }
        return res.json();
      })
      .then(() => {
        const updatedItems = itemsAsUserData.items.filter((_, index) => index !== indexToRemove);
        setItemsAsUserData({
          ...itemsAsUserData,
          items: updatedItems,
        });
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

	return (
	<>
  {loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error}</p>
  ) : (
    <>
    <h1 className = "intro" >Hi {itemsAsUserData.user.first_name} {itemsAsUserData.user.last_name}!</h1>
    <ul>
    {itemsAsUserData.items && itemsAsUserData.items.length > 0 ? (
      itemsAsUserData.items.map((item, index) => (
        <li key = {item.id} onMouseOver = {() => setShowingDelete(index)} onMouseOut = {() => setShowingDelete(null)}>
          {isEditing ? (
            <div className = "editing">
              <input
                type="text"
                className = "item-name-editing"
                value={editedItems[index].item_name}
                onChange={(e) =>
                  handleItemChange(index, "item_name", e.target.value)
                }
              />
              <textarea
                value={editedItems[index].description}
                className = "description-editing"
                onChange={(e) =>
                  handleItemChange(index, "description", e.target.value)
                }
              />
              <input
                type="number"
                className = "quantity-editing"
                value={editedItems[index].quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", e.target.value)
                }
              />
            </div>
          ) : (
        <Link to = {`/Items/${userID}/${item.id}`}>
          <div className="item-container">
           <span className="item-name">Item: {item.item_name}</span>
            <span className="item-description">
             Description: {item.description.length > 100
             ? `${item.description.slice(0, 100)}...`
             : item.description}
             </span>
           <span className="item-quantity">Quantity: {item.quantity}</span>
          </div>
      </Link>
      )}
      {showingDelete === index && (<button className = "delete" onClick={() => removeFromInventory(index, item.id)}>Delete</button>)}
    </li>
    ))
    ) : (
      <p>No items found.</p>
    )}
  </ul>
    <button className = "cancel-edit" onClick = {handleEditToggle}>{isEditing ? "Cancel" : "Edit"}</button>
    {isEditing && <button className = "save" onClick = {handleSave}>Save</button>}
    {!isEditing && <Link to = {`/Items/${userID}/Add`}><button className = "add">Add Item</button></Link>}
    {/* {!isEditing && <Link to = '/Items'><button>All Items by All Managers</button></Link>} */}
    {/* {!isEditing && <Link to = "/"><button onClick={() => {setUserID('')}} className = "sign-out-button">Sign Out</button></Link>} */}
  </>
  )}
  </>
	)
}

export default Items;
