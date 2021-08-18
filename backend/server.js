require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const mongoose = require('mongoose');

const source = process.env.ATLAS_CONNECTION;
mongoose.connect(source, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("DB connected");
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});

const userRoutes = require('./src/controllers/UserController');
app.use('/users', userRoutes);

const taskRoutes = require('./src/controllers/TaskController');
app.use('/tasks', taskRoutes);