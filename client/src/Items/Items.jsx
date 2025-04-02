import "./Items.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'

function Items() {
	const [allItems, setAllItems] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

		useEffect(() => {
				fetch(`http://localhost:3001/items`)
				.then((res) => {
						console.log(res.status)
						return res.json()
				})
				.then((data) => {
					console.log("Fetched items data:", data);
					setLoading(false)
					setAllItems(data)
				})
				.catch((error) => {
					setLoading(false);
					setError(error.message);
					console.error('Error fetching data:', error);
		});
	}, []);

	return (
	<>
			<Link to = "/"><button>Home</button></Link>
		{allItems.length > 0 ? (
			allItems.map((item) => (
				<Link to = {`/Items/${item.id}`} key={item.id}>
        	<div className="items-container">
        		<p className = "item-name">{item.item_name}</p>
						<p className = "item-description">{item.description}</p>
        		<p className = "item-quantity">{item.quantity}</p>
		    	</div>
				</Link>
    ))
  ) : (
		<p>No Items found.</p>
  )}
  </>
	)
}

export default Items;