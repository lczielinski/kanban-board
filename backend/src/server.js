const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(source, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})

const connection = mongoose.connection
connection.once('open', () => {
  console.log("DB connected.");
})
