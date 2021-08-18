require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT;
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
