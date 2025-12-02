const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const Todo = require('./models/Todo');
const User = require('./models/User');

const sequelize = require('./db');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); 

// Test route
app.get('/', (req, res) => {
    res.send('API running...');
});

// GET all todos
app.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST add new todo
app.post('/todos', async (req, res) => {
    console.log("Incoming todo:", req.body); 
    const { title, description, status } = req.body;
    console.log(title, description, status); 

    try {
        const newTodo = await Todo.create({ title, description, status });
        res.json(newTodo);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: err.message });
    }
});

// UPDATE a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params; // id of the todo to update
    const { title, description, status } = req.body; // new data

    try {
        // Find the todo by primary key (sno)
        const todo = await Todo.findByPk(id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        // Update todo fields
        todo.title = title;
        todo.description = description;
        todo.status = status;

        // Save changes
        await todo.save();

        res.json(todo); // return updated todo
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});


// DELETE a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Todo.destroy({ where: { sno: id } });
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//USER ROUTES
// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll({ order: [['id', 'DESC']] });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST add user
app.post('/users', async (req, res) => {
  const { name, email, dob, phone, address } = req.body;

  if (!name || !email || !dob || !phone || !address) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const newUser = await User.create({ name, email, dob, phone, address });
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE user
app.delete('/users/:id', async (req, res) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE user
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, dob, phone, address } = req.body;

  if (!name || !email || !dob || !phone || !address) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Find user by primary key
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields
    user.name = name;
    user.email = email;
    user.dob = dob;
    user.phone = phone;
    user.address = address;

    // Save changes
    await user.save();

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});



// Sync DB and start server
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
