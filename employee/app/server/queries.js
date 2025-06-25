const { Pool } = require('pg');
require("dotenv").config();


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "fullstackdb_employee",
  password: "postgres",
  port: 5432,
});

module.exports = pool;

const getUsers = (req, res) => {
  console.log("✅ GET /users called");

  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      console.error("❌ Database query error in getUsers:", error.message);
      res.status(500).send("Database error.");
      return;
    }

    console.log("📦 Users fetched:", results.rows.length);
    res.status(200).json(results.rows);
  });
};

const getUserById = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("SELECT * FROM users WHERE id = $1", [id], (error, results) => {
    if (error) {
      console.error("❌ Error in getUserById:", error.message);
      res.status(500).send("Database error.");
      return;
    }

    res.status(200).json(results.rows);
  });
};

const createUser = (req, res) => {
  const { name, email } = req.body;

  pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [name, email], (error) => {
    if (error) {
      console.error("❌ Error in createUser:", error.message);
      res.status(500).send("Database error.");
      return;
    }

    res.status(201).send("✅ User added.");
  });
};

const updateUser = (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email } = req.body;

  pool.query("UPDATE users SET name = $1, email = $2 WHERE id = $3", [name, email, id], (error) => {
    if (error) {
      console.error("❌ Error in updateUser:", error.message);
      res.status(500).send("Database error.");
      return;
    }

    res.status(200).send("✅ User updated.");
  });
};

const deleteUser = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query("DELETE FROM users WHERE id = $1", [id], (error) => {
    if (error) {
      console.error("❌ Error in deleteUser:", error.message);
      res.status(500).send("Database error.");
      return;
    }

    res.status(200).send("✅ User deleted.");
  });
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };


