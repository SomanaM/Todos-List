import './App.css';
import Header from './MYComponents/Header';
import Todos from './MYComponents/Todos';
import Footer from './MYComponents/footer';
import React, { useState, useEffect } from 'react';
import AddTodo from './MYComponents/AddTodo';
import About from './MYComponents/About';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyTodos from './MYComponents/MyTodos';

function App() {
  const savedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
  const [todos, setTodos] = useState(savedTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // DELETE
  const onDelete = (todo) => {
    fetch(`http://localhost:5000/todos/${todo.sno}`, { method: 'DELETE' })
      .then(res => res.json())
      .then(() => {
        setTodos(todos.filter(e => e.sno !== todo.sno));
      })
      .catch(err => console.error(err));
  }

  // ADD
  const addTodo = (title, desc, status) => {
    if (!title || !desc || !status) {
      alert("Title, Description or Status cannot be blank");
      return;
    }

    const newTodo = { title, description: desc, status };
    fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error("Error from backend:", data.error);
          alert("Error saving todo: " + data.error);
        } else {
          setTodos([...todos, data]);
          console.log("Todo saved:", data);
        }
      })
      .catch(err => console.error(err));
  }
const updateTodo = (sno, updatedTodo) => {
  fetch(`http://localhost:5000/todos/${sno}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedTodo)
  })
  .then(res => res.json())
  .then(data => {
    const newTodos = todos.map(todo => todo.sno === sno ? data : todo);
    setTodos(newTodos);
  })
  .catch(err => console.error(err));
};

  return (
    <Router>
      <Header title="My Todos List" searchBar={false} />
      <Routes>
        <Route path="/" element={
          <>
            <AddTodo addTodo={addTodo} />
            <Todos todos={todos} onDelete={onDelete} />
          </>
        } />
        <Route path="/about" element={<About />} />
        
       <Route 
  path="/mytodos" 
  element={<MyTodos 
            todos={todos} 
            onDelete={onDelete} 
            addTodo={addTodo} 
            updateTodo={updateTodo} 
          />} 
/>

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
