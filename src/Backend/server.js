const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const Todo = require('./models/Todo');
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

// Sync DB and start server
sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
