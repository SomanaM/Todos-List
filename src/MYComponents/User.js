import React, { useState, useEffect } from 'react';


const Users = ({ addUserToState }) => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDob] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.log(err));
    }, []);

    // ADD USER FUNCTION
    const addUser = () => {
        if (!name || !email || !dob || !phone || !address) {
            return alert("All fields are required");
        }

        if (!email.includes("@")) {
            return alert("Please enter a valid email address");
        }

        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(phone)) {
            return alert("Please enter a valid 10-digit phone number");
        }

        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, dob, phone, address })
        })
        .then(res => res.json())
        .then(newUser => {
            addUserToState(newUser); //For sending the new user to add and edit modal
            setUsers(prevUsers => [newUser, ...prevUsers]);//for updating the users list in this component

            
            // Clear form fields
            setName(''); 
            setEmail(''); 
            setDob(''); 
            setPhone(''); 
            setAddress('');
            setShowModal(false);
        })
        .catch(err => console.log(err));
    };

    //DELETE USER FUNCTION
    const deleteUser = (userId) => {
        fetch(`http://localhost:5000/users/${userId}`, {
            method: "DELETE"
        })
            .then(() => setUsers(users.filter(u => u.id !== userId)))
            .catch(err => console.log(err));
    };

    //EDIT USER FUNCTION
    const saveEditUser = (updatedUser) => {

        // Email validation
        if (!updatedUser.email.includes("@")) {
            return alert("Please enter a valid email address");
        }

        // Phone validation
        const phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test(updatedUser.phone)) {
            return alert("Please enter a valid 10-digit phone number");
        }

        fetch(`http://localhost:5000/users/${updatedUser.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedUser),
        })
            .then(res => res.json())
            .then(data => {
                const newUsers = users.map(u => (u.id === data.id ? data : u));
                setUsers(newUsers);

                setEditUser(null);
                setShowModal(false);
            })
            .catch(err => console.error(err));
    };



    return (
        <div className="container my-3">
            <button className="btn btn-success float-end mb-3" onClick={() => setShowModal(true)}>
                Add New User
            </button>


            {/* Add and edit modal */}
            <h3 className="my-3">Users List</h3>
            {(showModal || editUser) && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{editUser ? "Edit User" : "Add User"}</h5>
                                <button className="btn-close" onClick={() => { setShowModal(false); setEditUser(null); }}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="nameInput" className="form-label">Name</label>
                                    <input
                                        id="nameInput"
                                        type="text"
                                        value={editUser ? editUser.name : name}
                                        onChange={e => editUser ? setEditUser({ ...editUser, name: e.target.value }) : setName(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="emailInput" className="form-label">Email</label>
                                    <input
                                        id="emailInput"
                                        type="email"
                                        value={editUser ? editUser.email : email}
                                        onChange={e => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setEmail(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter email"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="dobInput" className="form-label">Date of Birth</label>
                                    <input
                                        id="dobInput"
                                        type="date"
                                        value={editUser ? editUser.dob : dob}
                                        onChange={e => editUser ? setEditUser({ ...editUser, dob: e.target.value }) : setDob(e.target.value)}
                                        className="form-control"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phoneInput" className="form-label">Phone</label>
                                    <input
                                        id="phoneInput"
                                        type="text"
                                        value={editUser ? editUser.phone : phone}
                                        onChange={e => editUser ? setEditUser({ ...editUser, phone: e.target.value }) : setPhone(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="addressInput" className="form-label">Address</label>
                                    <textarea
                                        id="addressInput"
                                        value={editUser ? editUser.address : address}
                                        onChange={e => editUser ? setEditUser({ ...editUser, address: e.target.value }) : setAddress(e.target.value)}
                                        className="form-control"
                                        placeholder="Enter address"
                                        rows={3}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button
                                    className="btn btn-success"
                                    onClick={() => editUser ? saveEditUser(editUser) : addUser()}
                                >
                                    {editUser ? "Save Changes" : "Save"}
                                </button>
                                <button
                                    className="btn btn-secondary"
                                    onClick={() => { setShowModal(false); setEditUser(null); }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {(showModal || editUser) && <div className="modal-backdrop fade show"></div>}




            {/* Users Table */}
            {users.length === 0 ? (
                <p>No users to display</p>
            ) : (
                <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    <table className="table table-bordered table-hover">
                        <thead className="table-dark" style={{ position: 'sticky', top: 0, zIndex: 1 }}>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>DOB</th>
                                <th>Phone Number</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[...users].reverse().map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.dob}</td>
                                    <td>{user.phone || 'N/A'}</td>
                                    <td>{user.address || 'N/A'}</td>

                                    <td style={{ display: "flex", gap: "5px", flexWrap: "nowrap", alignItems: "center" }}>
                                        <button className="btn btn-sm btn-primary" onClick={() => setEditUser(user)}>Edit</button>
                                        <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
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

export default Users;
