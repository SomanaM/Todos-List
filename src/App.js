import './App.css';
import Header from './MYComponents/Header';
import Todos from './MYComponents/Todos';
import Footer from './MYComponents/footer';
import React, { useState, useEffect } from 'react';
import AddTodo from './MYComponents/AddTodo';

function App() {
  let initTodo;

  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const [todos, setTodos] = useState(initTodo);

   useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onDelete = (todo) => {
    console.log("I am onDelete of todo", todo);
    setTodos(todos.filter((e) => e !== todo));
  }

  const addTodo = (title, desc) => {
    console.log("I am adding this todo", title, desc);
    const myTodo = {
      sno: todos.length + 1,
      title: title,
      desc: desc,
    }
    setTodos([...todos, myTodo]);
    console.log(myTodo);
  }

  return (
    <>
      <Header title="My Todos List" searchBar={false} />
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
      <Footer />
    </>
  );
}

export default App;
