import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Custom CSS for styles....

//const API_URL = "http://13.233.139.87:5000/api";
const API_URL = "/user/api";

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
      <h1>User Management -React</h1>
      <div className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={addOrUpdateUser}>
          {editId ? "Update User" : "Add User"}
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Email</th><th>Actions</th>
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
  );
}

export default App;

