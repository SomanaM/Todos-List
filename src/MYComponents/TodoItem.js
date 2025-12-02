import React from 'react'

const TodoItem = ({todo,onDelete}) => {
  return (
    <>
    <div>
<h4>{todo.title}</h4>
<p>{todo.description}</p>
<p>Status: {todo.status}</p> 
<button className='btn btn-sm btn-danger' onClick={()=>{onDelete(todo)}}>Delete</button>
  </div>
  <hr/>
  </>
  )
}

export default TodoItem
