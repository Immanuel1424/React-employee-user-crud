import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Make sure styles match the structure....

const API_URL = "http://13.233.139.87:5000/api"; // Employee backend

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      console.error("Fetch error:", err.message);
    }
  };

  const addOrUpdateUser = async () => {
    try {
      if (editId) {
        await axios.put(`${API_URL}/users/${editId}`, { name, email });
      } else {
        await axios.post(`${API_URL}/users`, { name, email });
      }
      setName("");
      setEmail("");
      setEditId(null);
      fetchUsers();
    } catch (err) {
      console.error("Submit error:", err.message);
    }
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <div className="container">
      <h1>👥 Employee Management</h1>

      <div className="form-section">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
        />
        <button onClick={addOrUpdateUser}>
          {editId ? "✏️ Update" : "➕ Add"}
        </button>
      </div>

      <div className="table-section">
        <table>
          <thead>
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(u)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;

