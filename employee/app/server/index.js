require("dotenv").config();
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
const db = require("./queries");

const app = express();
const port = process.env.PORT || 5000;  // ✅ Use environment variable PORT

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/api/users", db.getUsers);
app.get("/api/users/:id", db.getUserById);
app.post("/api/users", db.createUser);
app.put("/api/users/:id", db.updateUser);
app.delete("/api/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

