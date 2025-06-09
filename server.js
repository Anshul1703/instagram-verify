const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require('path'); // ⬅️ You missed this
require('dotenv').config();



const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // 👈 THIS is the real MVP

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Connect to MongoDB
mongoose.connect('mongodb+srv://nobody123:**********@cluster0.z4jnbkn.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("DB Connected")).catch(console.error);

// Schema
const User = mongoose.model("User", new mongoose.Schema({
  username: String,
  password: String,
}));

// Register Route
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password }); // 🔥 (hash password in production)
  await user.save();
  res.send("User registered!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
