import React, { useState } from 'react';
import AddTodo from './AddTodo';

const MyTodos = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [editTodo, setEditTodo] = useState(null); // Track todo being edited

   const handleEdit = (todo) => {
    setEditTodo(todo); // set the todo to edit
    setShowModal(true); // open modal
  }
  const handleCloseModal = () => {
    setShowModal(false);
    setEditTodo(null); // reset editTodo when modal closes
  }

  return (
    <div className="container my-3">

      <button
        className="btn btn-success float-end mb-3"
        onClick={() => setShowModal(true)}
      >
        Add New ToDo
      </button>

      <h3 className="my-3">Todos List</h3>

      {/* Modal */}
      {showModal && (
  <div className="modal show d-block" tabIndex="-1">
    <div className="modal-dialog">
      <div className="modal-content">

        <div className="modal-header">
          <h5 className="modal-title">{editTodo ? "Edit Todo" : "Add Todo"}</h5>
          <button
            type="button"
            className="btn-close"
            onClick={handleCloseModal}
          ></button>
        </div>

        <div className="modal-body">
          <AddTodo
            addTodo={props.addTodo}
            editTodo={editTodo}
            updateTodo={props.updateTodo}
            closeModal={handleCloseModal}
          />
        </div>

      </div>
    </div>
  </div>
)}

      {showModal && <div className="modal-backdrop fade show"></div>}

      {/* Table View */}
      {props.todos.length === 0 ? (
        <p>No todos to display</p>
      ) : (
        <div style={{ maxHeight: "620px", overflowY: "auto" }}>
          <table className="table table-bordered table-hover">
            <thead className="table-dark" style={{ position: "sticky", top: 0, zIndex: 1 }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>

            <tbody>
              {[...props.todos].reverse().map((todo, index) => (
                <tr key={todo.sno || index}>
                  <td>{index + 1}</td>
                  <td>{todo.title}</td>
                  <td>{todo.description}</td>
                  <td>
  <select
    className="form-select"
    value={todo.status}
    onChange={(e) => props.updateTodo(todo.sno, { ...todo, status: e.target.value })}
  >
    <option value="onhold">On Hold</option>
    <option value="in_progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>
</td>

                  <td>
                    <button
                      className="btn btn-sm btn-danger me-2"
                      onClick={() => props.onDelete(todo)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleEdit(todo)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

export default MyTodos;
