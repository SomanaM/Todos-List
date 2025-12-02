import React, { useState, useEffect } from 'react';

const Users = () => {
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

    const addUser = () => {
        if (!name || !email || !dob || !phone || !address)
            return alert("All fields are required");

        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, dob, phone, address })
        })
            .then(res => res.json())
            .then(newUser => {
                setUsers([...users, newUser]);
                setName(''); setEmail(''); setDob(''); setPhone(''); setAddress('');
                setShowModal(false);
            })
            .catch(err => console.log(err));
    };


    const deleteUser = (userId) => {
        fetch(`http://localhost:5000/users/${userId}`, {
            method: "DELETE"
        })
            .then(() => setUsers(users.filter(u => u.id !== userId)))
            .catch(err => console.log(err));
    };
    const saveEditUser = (updatedUser) => {
  // Call backend API to update user
  fetch(`http://localhost:5000/users/${updatedUser.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedUser),
  })
    .then(res => res.json())
    .then(data => {
      // Update the state to reflect the edited user
      const newUsers = users.map(u => (u.id === data.id ? data : u));
      setUsers(newUsers);

      // Close the modal
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
          <input
            type="text"
            value={editUser ? editUser.name : name}
            onChange={e => editUser ? setEditUser({ ...editUser, name: e.target.value }) : setName(e.target.value)}
            className="form-control mb-2"
            placeholder="Name"
          />
          <input
            type="email"
            value={editUser ? editUser.email : email}
            onChange={e => editUser ? setEditUser({ ...editUser, email: e.target.value }) : setEmail(e.target.value)}
            className="form-control mb-2"
            placeholder="Email"
          />
          <input
            type="date"
            value={editUser ? editUser.dob : dob}
            onChange={e => editUser ? setEditUser({ ...editUser, dob: e.target.value }) : setDob(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="text"
            value={editUser ? editUser.phone : phone}
            onChange={e => editUser ? setEditUser({ ...editUser, phone: e.target.value }) : setPhone(e.target.value)}
            className="form-control mb-2"
            placeholder="Phone"
          />
          <textarea
            value={editUser ? editUser.address : address}
            onChange={e => editUser ? setEditUser({ ...editUser, address: e.target.value }) : setAddress(e.target.value)}
            className="form-control mb-2"
            placeholder="Address"
            rows={3}
          ></textarea>
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
