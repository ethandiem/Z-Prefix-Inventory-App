const path = require("path");
const dotenv = require("dotenv");
require("dotenv").config({ path: "/app_data/.env" });
const express = require("express");
const app = express();
var PORT = process.env.SERVER_PORT;
const cors = require("cors");
const knex = require("knex")(require("../knexfile")["development"]);

if (!PORT) {
	dotenv.config({ path: path.resolve(__dirname, "../../.env") });
	PORT = process.env.SERVER_PORT;
}

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.status(200).json({message: "We up"});
});

const server = app.listen(PORT, () => {
	console.log(`App listening at http://localhost:${PORT}`);
});


//users

app.get('/users', async (req, res) => {
	try {
			const query = await knex('user')
															.select('*')
			res.status(200).json(query)
	} catch (error) {
			console.error('Error fetching units:', error);
			res.status(500).json({ error: 'Failed to retrieve units' });
	}
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await knex('user').where({ id }).first();
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'user not found' });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.post('/users', async (req, res) => {
    const { first_name, last_name, username, password } = req.body;

    // Validate
    if (
			typeof first_name !== "string" || first_name.trim() === '' ||
			typeof last_name !== "string" || last_name.trim() === '' ||
			typeof username !== "string" || username.trim() === '' ||
			typeof password !== "string" || password.trim() === ''
	) {
			return res.status(400).json({ message: 'All fields Must be Filled' });
    }

    try {
        // // Fetch all existing unit IDs
        const insert = await knex('user').insert({ first_name, last_name, username, password }).returning('*');


        // Respond with success
        if (insert.length == 1) {
            res.status(201).json({
                message: `User created successfully`,
            });
        } else {
            res.status(404).json({error: 'Error inserting new user'})
        }
    } catch (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.patch('/users', async(req, res) => {
	const id = parseInt(req.body.id)
	const { first_name, last_name, username, password } = req.body

	if (!id || typeof id !== "number") {
		return res.status(400).json({ error: 'User ID is required and must be a number' });
}

// Build the `updates` object dynamically
const updates = {};
if (first_name && typeof first_name === "string" && first_name.trim() !== '') {
		updates.first_name = first_name;
}
if (last_name && typeof last_name === "string" && last_name.trim() !== '') {
		updates.last_name = last_name;
}
if (username && typeof username === "string" && username.trim() !== '') {
		updates.username = username;
}
if (password && typeof password === "string" && password.trim() !== '') {
		updates.password = password;
}

	// removing undefined values to only keep the columns we want to p
	if (Object.keys(updates).length === 0) {
		return res.status(400).json({ error: 'No valid fields provided for update' });
}
	// TODO type check name
	try {
			const patch = await knex('user')
				.where('id', id)
				.update(updates);

			if (patch == 1){
					res.status(201).json({message: `Patch for user ${username} was successful`})
			} else {
					res.status(404).json({error: `Could not patch user ${username}`})
			}
	} catch (error) {
			console.log(error)
			res.status(500).json({error: 'Internal Server Error'})
	}
})

app.delete('/users', async (req, res) => {
	const id = parseInt(req.body.id)

	if (typeof id !== 'number' || isNaN(id)) {
			res.status(400).json({ error: 'Invalid or missing fields. Must include id of unit to delete from this endpoint' });
			return
	}

	try {
			const del = await knex('user')
				.where('id', id)
				.del()
			if (del == 1) {
					res.status(200).json({message: `User successfully deleted`})
			} else {
					res.status(404).json({message: `Could not find user to delete`})
			}
	} catch (error) {
			res.status(500).json({message: 'Internal Server Error'})
	}
})


//items

app.get('/items', async (req, res) => {
	try {
			const query = await knex('item')
															.select('*')
			res.status(200).json(query)
	} catch (error) {
			console.error('Error fetching units:', error);
			res.status(500).json({ error: 'Failed to retrieve units' });
	}
})

app.get('/items/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const item = await knex('item').where({ id }).first();
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: 'item not found' });
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

app.post('/items', async (req, res) => {
	const { user_id, item_name, description, quantity } = req.body;

	// Validate
	if (
		typeof user_id !== "number" || isNaN(user_id) ||
		typeof item_name !== "string" || item_name.trim() === '' ||
		typeof description !== "string" || description.trim() === '' ||
		typeof quantity !== "number" || isNaN(quantity)
) {
		return res.status(400).json({ message: 'All Fields Must be Filled' });
	}

	try {
			// // Fetch all existing unit IDs
			const insert = await knex('item').insert({ user_id: user_id, item_name: item_name, description: description, quantity: quantity }).returning('*');


			// Respond with success
			if (insert.length == 1) {
					res.status(201).json({
							message: `Item created successfully`,
					});
			} else {
					res.status(404).json({error: 'Error inserting new item'})
			}
	} catch (error) {
			return res.status(500).json({ error: 'Internal Server Error' });
	}
});

app.patch('/items', async (req, res) => {
  const { id, item_name, description, quantity } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Item ID is required" });
  }

  const updates = {};
  if (item_name) updates.item_name = item_name;
  if (description) updates.description = description;
  if (quantity) updates.quantity = quantity;

  try {
    const updated = await knex('item').where({ id }).update(updates);
    if (updated) {
      res.status(200).json({ message: "Item updated successfully" });
    } else {
      res.status(404).json({ error: "Item not found" });
    }
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete('/items', async (req, res) => {
	const id = parseInt(req.body.id)

	if (typeof id !== 'number' || isNaN(id)) {
			res.status(400).json({ error: 'Invalid or missing fields. Must include id of unit to delete from this endpoint' });
			return
	}

	try {
			const del = await knex('item')
				.where('id', id)
				.del()
			if (del == 1) {
					res.status(200).json({message: `User successfully deleted`})
			} else {
					res.status(404).json({message: `Could not find user to delete`})
			}
	} catch (error) {
			res.status(500).json({message: 'Internal Server Error'})
	}
})

app.delete('/items/:id', async (req, res) => {
	const { id } = req.params;

	try {
			const del = await knex('item').where({ id }).del();
			if (del) {
					res.status(200).json({message: `Item successfully deleted`})
			} else {
					res.status(404).json({message: `Could not find Item to delete`})
			}
	} catch (error) {
			res.status(500).json({message: 'Internal Server Error'})
	}
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Both username and password are required." });
  }

  try {
    const user = await knex('user').whereRaw('LOWER(username) = ?', [username.toLowerCase()])
		.andWhere({ password })
		.first();

    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid username or password." });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/users/:id/items', async (req, res) => {
  const { id } = req.params;

  try {
    // Perform a join query to get the user's first and last name along with their items
    const user = await knex('user')
      .where('user.id', id)
      .select('user.first_name', 'user.last_name')
      .first();

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const items = await knex('item')
      .where({ user_id: id })
      .select('id', 'item_name', 'description', 'quantity');

    res.status(200).json({
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
      },
      items: items.length > 0 ? items : [],
    });
  } catch (error) {
    console.error('Error fetching user items:', error);
    res.status(500).json({ error: 'Failed to query user items database' });
  }
});

module.exports = { app, server, PORT };
