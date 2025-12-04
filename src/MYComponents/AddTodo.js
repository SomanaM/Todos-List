import React, { useState, useEffect } from 'react';

const AddTodo = ({ addTodo, editTodo, updateTodo, closeModal, users }) => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [status, setStatus] = useState("onhold");
    const [assignedUserId, setAssignedUserId] = useState("");


    useEffect(() => {
        if (editTodo) {
            setTitle(editTodo.title);
            setDesc(editTodo.description);
            setStatus(editTodo.status);
            setAssignedUserId(editTodo.assignedUserId || "");

        }
    }, [editTodo]);
    // <-- ADD THIS


    const submit = (e) => {
        e.preventDefault();

        if (!title || !desc || !status) {
            alert("Title, Description or Status cannot be blank");
            return;
        }

        if (editTodo) {
            updateTodo(editTodo.sno, { title, description: desc, status, assignedUserId });
        } else {
            addTodo(title, desc, status, assignedUserId);
        }

        setTitle("");
        setDesc("");
        setStatus("onhold");

        if (closeModal) {
            closeModal();
        }
    };

    return (
        <div className="container my-3">
            {/* <h3>{editTodo ? "Edit Todo" : "Add Todo"}</h3> */}
            <form onSubmit={submit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Todo Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                        id="title"
                        placeholder="Enter todo title here..."
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="desc" className="form-label">Todo Description</label>
                    <textarea
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        className="form-control"
                        id="desc"
                        rows={4}
                        placeholder="Enter detailed description here..."
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Assign To</label>
                    <select
                        className="form-select"
                        value={assignedUserId}
                        onChange={(e) => setAssignedUserId(e.target.value)}
                    >
                        <option value="">Unassigned</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>


                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        id="status"
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Select Status</option>
                        <option value="onhold">On Hold</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-sm btn-success">
                    {editTodo ? "Update Todo" : "Add Todo"}
                </button>
                <button type="button" className="btn btn-sm btn-secondary mx-2" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
};

export default AddTodo;
